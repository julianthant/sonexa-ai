// Audio utility functions for voice message processing

// Supported audio formats
export const SUPPORTED_AUDIO_FORMATS = [
  'audio/mpeg', // MP3
  'audio/mp3',
  'audio/wav',
  'audio/wave',
  'audio/x-wav',
  'audio/mp4',
  'audio/m4a',
  'audio/aac',
  'audio/ogg',
  'audio/webm',
  'audio/flac',
];

export const SUPPORTED_EXTENSIONS = [
  '.mp3',
  '.wav',
  '.mp4',
  '.m4a',
  '.aac',
  '.ogg',
  '.webm',
  '.flac',
];

// Maximum file size (50MB)
export const MAX_FILE_SIZE = 50 * 1024 * 1024;

/**
 * Validates if a file is a supported audio format
 */
export function validateAudioFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than ${formatFileSize(MAX_FILE_SIZE)}`,
    };
  }

  // Check file type
  if (!SUPPORTED_AUDIO_FORMATS.includes(file.type)) {
    // Also check file extension as fallback
    const extension = getFileExtension(file.name);
    if (!SUPPORTED_EXTENSIONS.includes(extension)) {
      return {
        valid: false,
        error: `Unsupported file format. Supported formats: ${SUPPORTED_EXTENSIONS.join(', ')}`,
      };
    }
  }

  return { valid: true };
}

/**
 * Gets the file extension from a filename
 */
export function getFileExtension(filename: string): string {
  return filename.toLowerCase().substring(filename.lastIndexOf('.'));
}

/**
 * Gets the duration of an audio file in seconds
 */
export function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(file);

    audio.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(url);
      resolve(audio.duration);
    });

    audio.addEventListener('error', () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not load audio file'));
    });

    audio.src = url;
  });
}

/**
 * Formats duration in seconds to MM:SS format
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Formats file size in bytes to human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Gets basic audio file info
 */
export async function getAudioFileInfo(file: File): Promise<{
  name: string;
  size: number;
  type: string;
  duration?: number;
  formattedSize: string;
  formattedDuration?: string;
}> {
  try {
    const duration = await getAudioDuration(file);
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      duration,
      formattedSize: formatFileSize(file.size),
      formattedDuration: formatDuration(duration),
    };
  } catch (error) {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      formattedSize: formatFileSize(file.size),
    };
  }
}

/**
 * Creates a waveform data array from audio file (simplified version)
 */
export async function generateWaveformData(file: File, samples: number = 100): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(file);

    audio.addEventListener('canplaythrough', async () => {
      try {
        // This is a simplified implementation
        // In a real app, you'd use Web Audio API for proper waveform generation
        const duration = audio.duration;
        const waveform: number[] = [];
        
        for (let i = 0; i < samples; i++) {
          // Generate pseudo-random waveform data
          // In reality, this would analyze the actual audio data
          waveform.push(Math.random() * 0.8 + 0.1);
        }

        URL.revokeObjectURL(url);
        resolve(waveform);
      } catch (error) {
        URL.revokeObjectURL(url);
        reject(error);
      }
    });

    audio.addEventListener('error', () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not process audio file'));
    });

    audio.src = url;
  });
}

/**
 * Checks if the browser supports audio playback for the given file
 */
export function canPlayAudioType(type: string): boolean {
  const audio = new Audio();
  return audio.canPlayType(type) !== '';
}

/**
 * Gets supported audio formats that the browser can play
 */
export function getSupportedFormats(): string[] {
  return SUPPORTED_AUDIO_FORMATS.filter(canPlayAudioType);
}
