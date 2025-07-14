# Voice Message Email Processing System - Frontend Architecture

## Overview
This document outlines the complete frontend implementation for the Sonexa AI voice message email processing system. The system processes incoming emails to `voice.sonexa.tech` domain, extracts voice attachments, and provides a comprehensive interface for managing and playing voice messages.

## System Architecture

### Data Flow
```
Email → Resend Webhook → Backend Processing → Frontend Updates → User Interface
```

1. **Email Reception**: Emails sent to `{company}@voice.sonexa.tech`
2. **Webhook Processing**: Resend triggers webhook to backend
3. **Voice Extraction**: Backend extracts and processes voice attachments
4. **Frontend Sync**: Real-time updates to frontend components
5. **User Interaction**: Play, manage, and organize voice messages

## File Structure

```
src/
├── types/
│   ├── voice.ts                 # Voice message type definitions
│   └── email.ts                 # Email processing type definitions
├── components/
│   ├── voice/
│   │   ├── VoiceMessagePlayer.tsx    # Audio player component
│   │   ├── VoiceMessageList.tsx      # Voice message list
│   │   ├── VoiceMessageCard.tsx      # Individual message card
│   │   └── VoiceUpload.tsx           # Voice file upload
│   ├── email/
│   │   ├── EmailProcessingStatus.tsx # Processing status display
│   │   ├── EmailInboxViewer.tsx      # Email inbox interface
│   │   └── ProcessingQueue.tsx       # Processing queue management
│   ├── dashboard/
│   │   ├── VoiceDashboard.tsx        # Main dashboard
│   │   └── ProcessingMetrics.tsx     # Analytics and metrics
│   └── settings/
│       ├── VoiceSettings.tsx         # Voice system settings
│       └── EmailDomainConfig.tsx     # Domain configuration
├── hooks/
│   ├── useVoiceMessages.ts      # Voice message state management
│   ├── useEmailProcessing.ts    # Email processing state
│   └── useAudioPlayer.ts        # Audio player controls
├── lib/
│   ├── voiceApi.ts             # Voice message API client
│   ├── emailWebhookApi.ts      # Email webhook API client
│   ├── audioUtils.ts           # Audio utility functions
│   └── emailUtils.ts           # Email utility functions
└── app/(authenticated)/
    ├── voice-messages/
    │   └── page.tsx            # Voice messages main page
    ├── email-processing/
    │   └── page.tsx            # Email processing dashboard
    └── voice-settings/
        └── page.tsx            # Voice settings page
```

## Type Definitions

### Voice Message Types (`src/types/voice.ts`)

```typescript
interface VoiceMessage {
  id: string;
  fileName: string;
  filePath: string;
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

interface VoiceFile {
  id: string;
  fileName: string;
  filePath: string;
  contentType: string;
  size: number;
  duration: number;
  voiceMessageId: string;
  createdAt: Date;
}

enum VoiceMessageStatus {
  RECEIVED = 'RECEIVED',
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
  ARCHIVED = 'ARCHIVED'
}

interface VoiceMessageMetadata {
  originalEmailId?: string;
  attachmentCount?: number;
  processingTime?: number;
  errorMessage?: string;
  retryCount?: number;
}
```

### Email Processing Types (`src/types/email.ts`)

```typescript
interface EmailWebhookPayload {
  id: string;
  type: string;
  created_at: string;
  data: EmailData;
}

interface EmailData {
  id: string;
  from: string;
  to: string[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
  headers?: Record<string, string>;
  received_at?: string;
}

interface EmailAttachment {
  id: string;
  filename: string;
  content_type: string;
  size: number;
  url: string;
}

interface ProcessingResult {
  success: boolean;
  voiceMessageId?: string;
  error?: string;
  processingTime: number;
}
```

## Component Specifications

### 1. VoiceMessagePlayer (`src/components/voice/VoiceMessagePlayer.tsx`)

**Purpose**: Advanced audio player for voice messages

**Features**:
- Play/pause/stop controls
- Progress bar with seek functionality
- Volume control with mute
- Playback speed adjustment (0.5x - 2x)
- Current time / total duration display
- Keyboard shortcuts (spacebar, arrow keys)
- Waveform visualization (optional)

**Props**:
```typescript
interface VoiceMessagePlayerProps {
  voiceMessage: VoiceMessage;
  autoPlay?: boolean;
  showWaveform?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
}
```

### 2. VoiceMessageList (`src/components/voice/VoiceMessageList.tsx`)

**Purpose**: Paginated list of voice messages with filtering and sorting

**Features**:
- Infinite scroll or pagination
- Search by sender, subject, or content
- Filter by date range, company, status
- Sort by date, duration, sender
- Bulk operations (archive, delete)
- Virtual scrolling for performance

**Props**:
```typescript
interface VoiceMessageListProps {
  organizationId: string;
  filters?: VoiceMessageFilters;
  onMessageSelect?: (message: VoiceMessage) => void;
  selectionMode?: boolean;
  className?: string;
}
```

### 3. VoiceMessageCard (`src/components/voice/VoiceMessageCard.tsx`)

**Purpose**: Individual voice message display card

**Features**:
- Sender avatar and name
- Subject and timestamp
- Duration and file size
- Quick play button
- Status indicator
- Action menu (archive, delete, share)
- Transcription preview

**Props**:
```typescript
interface VoiceMessageCardProps {
  voiceMessage: VoiceMessage;
  compact?: boolean;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onPlay?: () => void;
  className?: string;
}
```

### 4. EmailProcessingStatus (`src/components/email/EmailProcessingStatus.tsx`)

**Purpose**: Real-time processing status display

**Features**:
- Live processing queue status
- Progress indicators
- Error notifications
- Retry failed processing
- Processing time estimates
- Success/failure statistics

**Props**:
```typescript
interface EmailProcessingStatusProps {
  organizationId: string;
  refreshInterval?: number;
  showDetailed?: boolean;
  className?: string;
}
```

### 5. VoiceDashboard (`src/components/dashboard/VoiceDashboard.tsx`)

**Purpose**: Main dashboard overview

**Features**:
- Recent voice messages
- Processing statistics
- Quick actions
- System health status
- Activity timeline
- Storage usage

**Props**:
```typescript
interface VoiceDashboardProps {
  organizationId: string;
  timeRange?: DateRange;
  className?: string;
}
```

### 6. VoiceSettings (`src/components/settings/VoiceSettings.tsx`)

**Purpose**: Voice system configuration

**Features**:
- Email domain settings
- Notification preferences
- Auto-processing options
- Storage settings
- Transcription settings
- Security preferences

**Props**:
```typescript
interface VoiceSettingsProps {
  organizationId: string;
  onSettingsChange?: (settings: VoiceSettings) => void;
  className?: string;
}
```

## API Integration

### Voice API Client (`src/lib/voiceApi.ts`)

**Endpoints**:
- `GET /api/voice-messages` - List voice messages
- `GET /api/voice-messages/{id}` - Get voice message details
- `DELETE /api/voice-messages/{id}` - Delete voice message
- `POST /api/voice-messages/{id}/archive` - Archive voice message
- `GET /api/voice-messages/{id}/transcription` - Get transcription
- `POST /api/voice-messages/upload` - Upload voice file directly

### Email Webhook API Client (`src/lib/emailWebhookApi.ts`)

**Endpoints**:
- `GET /api/webhooks/email/health` - Health check
- `POST /api/webhooks/email/test` - Test webhook (dev only)
- `GET /api/webhooks/email/status` - Processing status
- `GET /api/webhooks/email/queue` - Processing queue
- `POST /api/webhooks/email/retry/{id}` - Retry failed processing

## State Management

### useVoiceMessages Hook

```typescript
interface UseVoiceMessagesReturn {
  messages: VoiceMessage[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  hasMore: boolean;
  
  // Actions
  loadMessages: (filters?: VoiceMessageFilters) => Promise<void>;
  loadMore: () => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  archiveMessage: (id: string) => Promise<void>;
  searchMessages: (query: string) => Promise<void>;
  
  // Real-time updates
  subscribe: () => void;
  unsubscribe: () => void;
}
```

### useEmailProcessing Hook

```typescript
interface UseEmailProcessingReturn {
  processingQueue: ProcessingItem[];
  status: ProcessingStatus;
  statistics: ProcessingStatistics;
  loading: boolean;
  error: string | null;
  
  // Actions
  retryProcessing: (emailId: string) => Promise<void>;
  cancelProcessing: (emailId: string) => Promise<void>;
  getProcessingHistory: () => Promise<ProcessingItem[]>;
  
  // Real-time updates
  subscribeToUpdates: () => void;
  unsubscribeFromUpdates: () => void;
}
```

### useAudioPlayer Hook

```typescript
interface UseAudioPlayerReturn {
  // State
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  loading: boolean;
  error: string | null;
  
  // Controls
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  
  // Events
  onTimeUpdate: (callback: (time: number) => void) => void;
  onEnded: (callback: () => void) => void;
  onError: (callback: (error: string) => void) => void;
}
```

## Pages Implementation

### Voice Messages Page (`src/app/(authenticated)/voice-messages/page.tsx`)

**Layout**:
```
┌─────────────────────────────────────────────────┐
│ Header: Search, Filters, Bulk Actions          │
├─────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────────────┐ │
│ │ VoiceMessageList│ │ VoiceMessagePlayer      │ │
│ │                 │ │                         │ │
│ │ - Message Cards │ │ - Audio Controls        │ │
│ │ - Pagination    │ │ - Waveform (optional)   │ │
│ │ - Filters       │ │ - Transcription         │ │
│ └─────────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Email Processing Page (`src/app/(authenticated)/email-processing/page.tsx`)

**Layout**:
```
┌─────────────────────────────────────────────────┐
│ ProcessingMetrics: Stats & Health              │
├─────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────────────┐ │
│ │ ProcessingQueue │ │ EmailInboxViewer        │ │
│ │                 │ │                         │ │
│ │ - Active Jobs   │ │ - Recent Emails         │ │
│ │ - Failed Items  │ │ - Processing Status     │ │
│ │ - Retry Actions │ │ - Manual Triggers       │ │
│ └─────────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Voice Settings Page (`src/app/(authenticated)/voice-settings/page.tsx`)

**Layout**:
```
┌─────────────────────────────────────────────────┐
│ Settings Navigation Tabs                       │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ EmailDomainConfig                           │ │
│ │ - Company Domains                           │ │
│ │ - Webhook Configuration                     │ │
│ │ - Email Routing Rules                       │ │
│ ├─────────────────────────────────────────────┤ │
│ │ VoiceSettings                               │ │
│ │ - Processing Options                        │ │
│ │ - Notification Settings                     │ │
│ │ - Storage Configuration                     │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## Utilities

### Audio Utilities (`src/lib/audioUtils.ts`)

**Functions**:
- `validateAudioFile(file: File): boolean`
- `getAudioDuration(file: File): Promise<number>`
- `convertToWaveform(audioUrl: string): Promise<number[]>`
- `formatDuration(seconds: number): string`
- `getSupportedFormats(): string[]`

### Email Utilities (`src/lib/emailUtils.ts`)

**Functions**:
- `parseVoiceDomain(email: string): CompanyInfo | null`
- `validateVoiceEmail(email: string): boolean`
- `extractCompanyIdentifier(email: string): string`
- `formatEmailAddress(email: string): string`
- `isVoiceAttachment(attachment: EmailAttachment): boolean`

## Real-time Features

### WebSocket Integration
- Real-time processing status updates
- Live voice message notifications
- Processing queue updates
- Error notifications

### Event Types
```typescript
interface VoiceMessageEvent {
  type: 'voice_message_received' | 'voice_message_processed' | 'processing_failed';
  data: VoiceMessage | ProcessingError;
  timestamp: Date;
}

interface ProcessingEvent {
  type: 'processing_started' | 'processing_completed' | 'processing_failed';
  emailId: string;
  voiceMessageId?: string;
  error?: string;
  timestamp: Date;
}
```

## Performance Considerations

### Optimization Strategies
1. **Virtual Scrolling**: For large voice message lists
2. **Lazy Loading**: Load audio files on demand
3. **Caching**: Cache frequently accessed voice messages
4. **Image Optimization**: Optimize waveform visualizations
5. **Debounced Search**: Reduce API calls during search
6. **Pagination**: Limit initial load size

### Bundle Size Management
- Tree-shaking for audio libraries
- Code splitting by route
- Lazy loading of heavy components
- Optimized audio format support

## Testing Strategy

### Component Testing
- Unit tests for all components
- Integration tests for complex workflows
- Audio playback testing
- Real-time update testing

### API Testing
- Mock audio file processing
- Webhook simulation
- Error handling scenarios
- Performance testing

## Security Considerations

### Audio File Security
- File type validation
- Size limits enforcement
- Virus scanning integration
- Secure audio streaming

### Data Privacy
- Audio data encryption
- Secure transcription handling
- User permission management
- GDPR compliance for voice data

## Implementation Timeline

### Phase 1: Core Infrastructure (Week 1)
- Type definitions
- Basic API clients
- Core hooks implementation

### Phase 2: Voice Components (Week 2)
- VoiceMessagePlayer
- VoiceMessageList
- VoiceMessageCard
- Basic audio utilities

### Phase 3: Email Processing (Week 3)
- Email processing components
- Processing queue management
- Real-time status updates

### Phase 4: Dashboard & Settings (Week 4)
- Dashboard implementation
- Settings configuration
- Advanced features

### Phase 5: Integration & Testing (Week 5)
- Backend integration
- End-to-end testing
- Performance optimization
- Bug fixes and refinements

## Future Enhancements

### Advanced Features
- AI-powered voice message categorization
- Voice-to-text search capabilities
- Voice message analytics
- Integration with calendar systems
- Voice message sharing and collaboration
- Multi-language transcription support

### Technical Improvements
- Progressive Web App (PWA) support
- Offline voice message playback
- Advanced audio visualization
- Voice message compression
- Automated voice message cleanup

This comprehensive frontend system will provide a complete interface for managing voice messages received via email, with real-time processing updates and a modern, intuitive user experience.
