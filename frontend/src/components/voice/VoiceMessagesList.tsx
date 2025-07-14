'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Play, Pause, Download, Archive, Trash2, Clock, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VoiceMessage, VoiceMessageStatus, VoiceMessageFilters } from '@/types/voice';
import { VoiceApiClient } from '@/lib/voiceApi';
import { formatDuration } from '@/lib/audioUtils';
import VoiceMessageStats from './VoiceMessageStats';

export default function VoiceMessagesClient() {
  const [voiceMessages, setVoiceMessages] = useState<VoiceMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<VoiceMessageStatus | 'all'>('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const organizationId = 'org-123'; // TODO: Get from auth context

  const voiceApi = new VoiceApiClient();

  const loadVoiceMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters: VoiceMessageFilters = {
        status: statusFilter === 'all' ? undefined : [statusFilter],
        search: searchTerm || undefined,
        sortBy: 'receivedAt',
        sortOrder: 'desc',
        page: 1,
        limit: 50,
      };

      const response = await voiceApi.listVoiceMessages(organizationId, filters);
      setVoiceMessages(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load voice messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVoiceMessages();
  }, [statusFilter, searchTerm]);

  const handlePlayPause = async (message: VoiceMessage) => {
    try {
      if (currentlyPlaying === message.id) {
        // Pause current audio
        if (currentAudio) {
          currentAudio.pause();
          setCurrentlyPlaying(null);
        }
      } else {
        // Stop any currently playing audio
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }

        // Play new audio
        const audioUrl = message.audioUrl || `/api/voice-messages/${message.id}/audio`;
        const audio = new Audio(audioUrl);
        audio.onended = () => setCurrentlyPlaying(null);
        audio.onerror = () => setError('Failed to play audio file');
        
        await audio.play();
        setCurrentAudio(audio);
        setCurrentlyPlaying(message.id);
      }
    } catch (err) {
      setError('Failed to play audio file');
    }
  };

  const handleDownload = (message: VoiceMessage) => {
    const link = document.createElement('a');
    link.href = message.audioUrl || `/api/voice-messages/${message.id}/audio`;
    link.download = message.fileName;
    link.click();
  };

  const handleArchive = async (messageId: string) => {
    try {
      await voiceApi.archiveVoiceMessage(messageId);
      await loadVoiceMessages();
    } catch (err) {
      setError('Failed to archive message');
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this voice message? This action cannot be undone.')) {
      return;
    }

    try {
      await voiceApi.deleteVoiceMessage(messageId);
      await loadVoiceMessages();
    } catch (err) {
      setError('Failed to delete message');
    }
  };

  const getStatusBadgeVariant = (status: VoiceMessageStatus) => {
    switch (status) {
      case VoiceMessageStatus.RECEIVED:
        return 'default';
      case VoiceMessageStatus.PROCESSING:
        return 'secondary';
      case VoiceMessageStatus.PROCESSED:
        return 'outline';
      case VoiceMessageStatus.ARCHIVED:
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: VoiceMessageStatus) => {
    switch (status) {
      case VoiceMessageStatus.RECEIVED:
        return 'text-blue-600';
      case VoiceMessageStatus.PROCESSING:
        return 'text-green-600';
      case VoiceMessageStatus.PROCESSED:
        return 'text-gray-600';
      case VoiceMessageStatus.ARCHIVED:
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="border-gray-300 border-t-blue-600 mx-auto mb-4 rounded-full border-4 w-8 h-8 animate-spin"></div>
          <p className="text-gray-600">Loading voice messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-bold text-gray-900 text-2xl">Voice Messages</h1>
          <p className="text-gray-600">
            Manage and listen to your voice messages received via email or uploaded directly.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 w-4 h-4" />
          Upload Voice Message
        </Button>
      </div>

      {/* Stats Section */}
      <VoiceMessageStats organizationId={organizationId} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search voice messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 w-4 h-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value={VoiceMessageStatus.RECEIVED}>New</SelectItem>
            <SelectItem value={VoiceMessageStatus.PROCESSING}>Processing</SelectItem>
            <SelectItem value={VoiceMessageStatus.PROCESSED}>Processed</SelectItem>
            <SelectItem value={VoiceMessageStatus.ARCHIVED}>Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setError(null)}
            className="mt-2"
          >
            Dismiss
          </Button>
        </div>
      )}

      {/* Voice Messages Grid */}
      {voiceMessages.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto mb-4 w-16 h-16 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <h3 className="font-medium text-gray-900 text-lg mb-2">
            No voice messages found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Voice messages will appear here as they are received via email or uploaded directly.'}
          </p>
          <Button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {voiceMessages.map((message) => (
            <Card key={message.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg truncate">{message.fileName}</CardTitle>
                  <Badge variant={getStatusBadgeVariant(message.status)}>
                    {message.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(message.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(message.receivedAt).toLocaleDateString()}</span>
                  </div>
                  {message.senderEmail && (
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="truncate">{message.senderEmail}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {message.transcription && (
                  <div className="bg-gray-50 mb-4 p-3 rounded-lg">
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {message.transcription}
                    </p>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePlayPause(message)}
                    className="flex-1"
                  >
                    {currentlyPlaying === message.id ? (
                      <Pause className="mr-1 w-3 h-3" />
                    ) : (
                      <Play className="mr-1 w-3 h-3" />
                    )}
                    {currentlyPlaying === message.id ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(message)}
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                  
                  {message.status !== VoiceMessageStatus.ARCHIVED && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleArchive(message.id)}
                    >
                      <Archive className="w-3 h-3" />
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(message.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
