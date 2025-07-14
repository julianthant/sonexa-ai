'use client';

import { useState, useEffect } from 'react';
import { VoiceApiClient } from '@/lib/voiceApi';
import { VoiceMessageStatus } from '@/types/voice';

interface VoiceMessageStats {
  totalMessages: number;
  totalDuration: number;
  receivedToday: number;
  unreadMessages: number;
  averageDuration: number;
}

interface ApiStats {
  totalMessages: number;
  totalDuration: number;
  totalSize: number;
  messagesByStatus: Record<string, number>;
  messagesByDay: Array<{ date: string; count: number }>;
}

interface VoiceStatsProps {
  organizationId: string;
}

export default function VoiceMessageStats({ organizationId }: VoiceStatsProps) {
  const [stats, setStats] = useState<VoiceMessageStats>({
    totalMessages: 0,
    totalDuration: 0,
    receivedToday: 0,
    unreadMessages: 0,
    averageDuration: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const voiceApi = new VoiceApiClient();

  useEffect(() => {
    loadStats();
  }, [organizationId]);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiStats: ApiStats = await voiceApi.getStatistics(organizationId);
      
      // Calculate derived statistics
      const today = new Date().toISOString().split('T')[0];
      const receivedToday = apiStats.messagesByDay.find(day => day.date === today)?.count || 0;
      const unreadMessages = apiStats.messagesByStatus[VoiceMessageStatus.RECEIVED] || 0;
      const averageDuration = apiStats.totalMessages > 0 ? apiStats.totalDuration / apiStats.totalMessages : 0;
      
      const stats: VoiceMessageStats = {
        totalMessages: apiStats.totalMessages,
        totalDuration: apiStats.totalDuration,
        receivedToday,
        unreadMessages,
        averageDuration,
      };
      
      setStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}h`;
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white shadow p-6 rounded-lg animate-pulse">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="bg-gray-200 mb-2 rounded w-20 h-4"></div>
                <div className="bg-gray-200 mb-2 rounded w-16 h-8"></div>
                <div className="bg-gray-200 rounded w-24 h-3"></div>
              </div>
              <div className="bg-gray-200 rounded-lg w-12 h-12"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <p className="text-red-700 text-sm">Error loading statistics: {error}</p>
      </div>
    );
  }

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Messages */}
      <div className="bg-white shadow p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="mb-1 font-medium text-gray-600 text-sm">
              Total Messages
            </p>
            <p className="font-bold text-gray-900 text-3xl">{stats.totalMessages.toLocaleString()}</p>
            <p className="mt-1 text-purple-600 text-sm">All voice messages</p>
          </div>
          <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Unread Messages */}
      <div className="bg-white shadow p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="mb-1 font-medium text-gray-600 text-sm">
              Unread Messages
            </p>
            <p className="font-bold text-gray-900 text-3xl">{stats.unreadMessages}</p>
            <p className="mt-1 text-blue-600 text-sm">Need attention</p>
          </div>
          <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Today's Messages */}
      <div className="bg-white shadow p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="mb-1 font-medium text-gray-600 text-sm">
              Today's Messages
            </p>
            <p className="font-bold text-gray-900 text-3xl">{stats.receivedToday}</p>
            <p className="mt-1 text-green-600 text-sm">Received today</p>
          </div>
          <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Total Duration */}
      <div className="bg-white shadow p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="mb-1 font-medium text-gray-600 text-sm">
              Total Duration
            </p>
            <p className="font-bold text-gray-900 text-3xl">{formatDuration(stats.totalDuration)}</p>
            <p className="mt-1 text-orange-600 text-sm">Hours of audio</p>
          </div>
          <div className="flex justify-center items-center bg-orange-100 rounded-lg w-12 h-12">
            <svg
              className="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
