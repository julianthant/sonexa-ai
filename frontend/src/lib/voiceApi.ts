// Voice Message API Client
import { VoiceMessage, VoiceMessageFilters, VoiceUploadResponse, VoiceUploadProgress } from '@/types/voice';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface VoiceMessageListResponse {
  data: VoiceMessage[];
  totalCount: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * Voice Message API Client
 */
export class VoiceApiClient {
  private static instance: VoiceApiClient;
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  static getInstance(): VoiceApiClient {
    if (!VoiceApiClient.instance) {
      VoiceApiClient.instance = new VoiceApiClient();
    }
    return VoiceApiClient.instance;
  }

  /**
   * Get authentication headers
   */
  private async getAuthHeaders(): Promise<HeadersInit> {
    // Get JWT token from your auth system
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  /**
   * List voice messages with filters
   */
  async listVoiceMessages(organizationId: string, filters?: VoiceMessageFilters): Promise<VoiceMessageListResponse> {
    const params = new URLSearchParams();
    params.append('organizationId', organizationId);

    if (filters) {
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status.join(','));
      if (filters.senderEmail) params.append('senderEmail', filters.senderEmail);
      if (filters.companyIdentifier) params.append('companyIdentifier', filters.companyIdentifier);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.dateRange) {
        params.append('fromDate', filters.dateRange.from.toISOString());
        params.append('toDate', filters.dateRange.to.toISOString());
      }
    }

    const response = await fetch(`${this.baseUrl}/api/voice-messages?${params}`, {
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch voice messages: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get a specific voice message by ID
   */
  async getVoiceMessage(id: string): Promise<VoiceMessage> {
    const response = await fetch(`${this.baseUrl}/api/voice-messages/${id}`, {
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch voice message: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Upload a voice file
   */
  async uploadVoiceFile(
    file: File,
    organizationId: string,
    metadata?: {
      senderEmail?: string;
      senderName?: string;
      subject?: string;
      companyIdentifier?: string;
    },
    onProgress?: (progress: VoiceUploadProgress) => void
  ): Promise<VoiceUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('organizationId', organizationId);

    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress: VoiceUploadProgress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100),
              status: 'uploading',
            };
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error('Invalid response format'));
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload cancelled'));
      });

      // Set auth headers
      const token = localStorage.getItem('auth_token');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      xhr.open('POST', `${this.baseUrl}/api/voice-messages/upload`);
      xhr.send(formData);
    });
  }

  /**
   * Delete a voice message
   */
  async deleteVoiceMessage(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/voice-messages/${id}`, {
      method: 'DELETE',
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete voice message: ${response.statusText}`);
    }
  }

  /**
   * Archive a voice message
   */
  async archiveVoiceMessage(id: string): Promise<VoiceMessage> {
    const response = await fetch(`${this.baseUrl}/api/voice-messages/${id}/archive`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to archive voice message: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get transcription for a voice message
   */
  async getTranscription(id: string): Promise<{ transcription: string; confidence?: number }> {
    const response = await fetch(`${this.baseUrl}/api/voice-messages/${id}/transcription`, {
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to get transcription: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get voice message statistics
   */
  async getStatistics(organizationId: string): Promise<{
    totalMessages: number;
    totalDuration: number;
    totalSize: number;
    messagesByStatus: Record<string, number>;
    messagesByDay: Array<{ date: string; count: number }>;
  }> {
    const response = await fetch(`${this.baseUrl}/api/voice-messages/statistics?organizationId=${organizationId}`, {
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to get statistics: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get the audio file URL for streaming
   */
  getAudioUrl(voiceMessage: VoiceMessage): string {
    const token = localStorage.getItem('auth_token');
    const tokenParam = token ? `?token=${encodeURIComponent(token)}` : '';
    return `${this.baseUrl}/api/voice-messages/${voiceMessage.id}/audio${tokenParam}`;
  }
}

// Export singleton instance
export const voiceApi = VoiceApiClient.getInstance();
