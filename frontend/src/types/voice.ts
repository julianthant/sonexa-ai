// Voice Message Types
export interface VoiceMessage {
  id: string;
  fileName: string;
  filePath: string;
  audioUrl?: string; // URL for playing audio
  contentType: string;
  size: number;
  duration: number;
  transcription?: string;
  summary?: string;
  senderEmail: string;
  senderName?: string;
  recipientEmail: string;
  companyIdentifier: string;
  organizationId: string;
  userId?: string;
  subject?: string;
  emailMessageId?: string;
  receivedAt: Date;
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  status: VoiceMessageStatus;
  metadata?: VoiceMessageMetadata;
}

export interface VoiceFile {
  id: string;
  fileName: string;
  filePath: string;
  contentType: string;
  size: number;
  duration: number;
  voiceMessageId: string;
  createdAt: Date;
}

export enum VoiceMessageStatus {
  RECEIVED = 'RECEIVED',
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
  ARCHIVED = 'ARCHIVED'
}

export interface VoiceMessageMetadata {
  originalEmailId?: string;
  attachmentCount?: number;
  processingTime?: number;
  errorMessage?: string;
  retryCount?: number;
}

export interface VoiceMessageFilters {
  search?: string;
  status?: VoiceMessageStatus[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  senderEmail?: string;
  companyIdentifier?: string;
  sortBy?: 'receivedAt' | 'duration' | 'senderEmail' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface VoiceUploadResponse {
  success: boolean;
  voiceMessage?: VoiceMessage;
  error?: string;
}

export interface VoiceUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
}
