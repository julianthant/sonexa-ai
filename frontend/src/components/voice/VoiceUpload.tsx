"use client";

import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, Play, Pause, FileAudio, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { validateAudioFile, getAudioFileInfo, formatFileSize, formatDuration } from '@/lib/audioUtils';
import { voiceApi } from '@/lib/voiceApi';
import { VoiceUploadProgress } from '@/types/voice';

interface VoiceUploadProps {
  organizationId: string;
  onUploadComplete?: (voiceMessageId: string) => void;
  onUploadError?: (error: string) => void;
  className?: string;
}

interface UploadFile {
  file: File;
  id: string;
  progress: VoiceUploadProgress;
  duration?: number;
  formattedDuration?: string;
  formattedSize: string;
  isPlaying?: boolean;
  audioUrl?: string;
  error?: string;
}

export function VoiceUpload({ 
  organizationId, 
  onUploadComplete, 
  onUploadError,
  className = "" 
}: VoiceUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
    
    // Clear the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const processFiles = async (fileList: File[]) => {
    const newFiles: UploadFile[] = [];

    for (const file of fileList) {
      const validation = validateAudioFile(file);
      
      if (!validation.valid) {
        onUploadError?.(validation.error || 'Invalid file');
        continue;
      }

      try {
        const fileInfo = await getAudioFileInfo(file);
        const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const uploadFile: UploadFile = {
          file,
          id: fileId,
          progress: {
            loaded: 0,
            total: file.size,
            percentage: 0,
            status: 'pending',
          },
          duration: fileInfo.duration,
          formattedDuration: fileInfo.formattedDuration,
          formattedSize: fileInfo.formattedSize,
          audioUrl: URL.createObjectURL(file),
        };

        newFiles.push(uploadFile);
      } catch (error) {
        console.error('Error processing file:', error);
        onUploadError?.('Error processing file');
      }
    }

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.audioUrl) {
        URL.revokeObjectURL(fileToRemove.audioUrl);
      }
      
      // Clean up audio element
      const audio = audioRefs.current.get(fileId);
      if (audio) {
        audio.pause();
        audioRefs.current.delete(fileId);
      }
      
      if (currentlyPlaying === fileId) {
        setCurrentlyPlaying(null);
      }
      
      return prev.filter(f => f.id !== fileId);
    });
  }, [currentlyPlaying]);

  const togglePlayback = useCallback((fileId: string) => {
    const uploadFile = files.find(f => f.id === fileId);
    if (!uploadFile?.audioUrl) return;

    // Stop other audio files
    audioRefs.current.forEach((audio, id) => {
      if (id !== fileId) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    let audio = audioRefs.current.get(fileId);
    if (!audio) {
      audio = new Audio(uploadFile.audioUrl);
      audioRefs.current.set(fileId, audio);
      
      audio.addEventListener('ended', () => {
        setCurrentlyPlaying(null);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, isPlaying: false } : f
        ));
      });
    }

    if (audio.paused) {
      audio.play();
      setCurrentlyPlaying(fileId);
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, isPlaying: true } : { ...f, isPlaying: false }
      ));
    } else {
      audio.pause();
      setCurrentlyPlaying(null);
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, isPlaying: false } : f
      ));
    }
  }, [files]);

  const uploadSingleFile = async (uploadFile: UploadFile) => {
    try {
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id 
          ? { ...f, progress: { ...f.progress, status: 'uploading' } }
          : f
      ));

      await voiceApi.uploadVoiceFile(
        uploadFile.file,
        organizationId,
        {
          senderEmail: 'user@example.com', // You can get this from user context
          subject: `Voice upload: ${uploadFile.file.name}`,
        },
        (progress) => {
          setFiles(prev => prev.map(f => 
            f.id === uploadFile.id ? { ...f, progress } : f
          ));
        }
      );

      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id 
          ? { ...f, progress: { ...f.progress, status: 'completed', percentage: 100 } }
          : f
      ));

      onUploadComplete?.(uploadFile.id);
      
      // Remove the file after successful upload
      setTimeout(() => removeFile(uploadFile.id), 2000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id 
          ? { 
              ...f, 
              progress: { ...f.progress, status: 'error' },
              error: errorMessage 
            }
          : f
      ));
      onUploadError?.(errorMessage);
    }
  };

  const uploadAllFiles = useCallback(() => {
    files
      .filter(f => f.progress.status === 'pending')
      .forEach(uploadSingleFile);
  }, [files, organizationId]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Zone */}
      <Card className={`border-2 border-dashed transition-colors ${
        isDragOver 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
      }`}>
        <CardContent className="p-8">
          <div
            className="text-center"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Voice Files
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your audio files here, or click to browse
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="mb-4"
            >
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <p className="text-sm text-gray-500">
              Supported formats: MP3, WAV, M4A, AAC, OGG • Max size: 50MB
            </p>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Upload Queue</h3>
              <div className="space-x-2">
                <Button
                  size="sm"
                  onClick={uploadAllFiles}
                  disabled={files.every(f => f.progress.status !== 'pending')}
                >
                  Upload All
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setFiles([])}
                >
                  Clear All
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {files.map((uploadFile) => (
                <div
                  key={uploadFile.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg"
                >
                  {/* File Icon */}
                  <div className="flex-shrink-0">
                    <FileAudio className="w-8 h-8 text-blue-500" />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {uploadFile.file.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        {uploadFile.progress.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        {uploadFile.progress.status === 'error' && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(uploadFile.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                      <span>
                        {uploadFile.formattedSize}
                        {uploadFile.formattedDuration && ` • ${uploadFile.formattedDuration}`}
                      </span>
                      {uploadFile.progress.status === 'uploading' && (
                        <span>{uploadFile.progress.percentage}%</span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {(uploadFile.progress.status === 'uploading' || uploadFile.progress.status === 'processing') && (
                      <Progress 
                        value={uploadFile.progress.percentage} 
                        className="mt-2"
                      />
                    )}

                    {/* Error Message */}
                    {uploadFile.error && (
                      <p className="text-sm text-red-600 mt-1">
                        {uploadFile.error}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex items-center space-x-2">
                    {/* Preview Play Button */}
                    {uploadFile.audioUrl && uploadFile.progress.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => togglePlayback(uploadFile.id)}
                      >
                        {uploadFile.isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    )}

                    {/* Upload Button */}
                    {uploadFile.progress.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => uploadSingleFile(uploadFile)}
                      >
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
