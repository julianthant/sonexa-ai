# 🎤 Sonexa AI - Frontend Documentation

## 📋 Project Overview
Sonexa AI Frontend - Next.js application for voice message management interface.

**Version:** 1.0.0  
**Next.js Version:** 15.0.0  
**React Version:** 19.0.0  
**TypeScript Version:** 5.0+  
**Styling:** Tailwind CSS  

---

## 🏗️ Architecture Overview

### **Technology Stack**
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + Custom Components
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Fetch API
- **Authentication:** JWT Tokens
- **File Upload:** Native HTML5 + Progress tracking

### **Project Structure**
```
frontend/
├── src/
│   ├── app/                            # Next.js App Router
│   │   ├── globals.css                 # Global styles
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Home page
│   │   ├── (auth)/                     # Authentication routes
│   │   │   ├── login/page.tsx          # Login page
│   │   │   └── register/page.tsx       # Register page
│   │   └── (dashboard)/                # Protected dashboard routes
│   │       ├── layout.tsx              # Dashboard layout
│   │       ├── dashboard/page.tsx      # Dashboard home
│   │       ├── voice-messages/         # Voice messages section
│   │       │   ├── page.tsx            # Voice messages list
│   │       │   └── [id]/page.tsx       # Voice message detail
│   │       └── upload/page.tsx         # Upload page
│   ├── components/                     # Reusable components
│   │   ├── ui/                         # Base UI components
│   │   │   ├── button.tsx              # Button component
│   │   │   ├── input.tsx               # Input component
│   │   │   ├── card.tsx                # Card component
│   │   │   └── ...                     # Other UI components
│   │   ├── auth/                       # Authentication components
│   │   │   ├── LoginForm.tsx           # Login form
│   │   │   ├── RegisterForm.tsx        # Register form
│   │   │   └── AuthGuard.tsx           # Route protection
│   │   ├── voice/                      # Voice message components
│   │   │   ├── VoiceUpload.tsx         # File upload component
│   │   │   ├── VoicePlayer.tsx         # Audio player
│   │   │   ├── VoiceList.tsx           # Messages list
│   │   │   └── VoiceCard.tsx           # Message card
│   │   └── layout/                     # Layout components
│   │       ├── Header.tsx              # Site header
│   │       ├── Sidebar.tsx             # Dashboard sidebar
│   │       └── Footer.tsx              # Site footer
│   ├── hooks/                          # Custom React hooks
│   │   ├── useAuth.ts                  # Authentication hook
│   │   ├── useVoiceMessages.ts         # Voice messages hook
│   │   └── useUpload.ts                # File upload hook
│   ├── lib/                            # Utility functions
│   │   ├── api.ts                      # API client
│   │   ├── auth.ts                     # Auth utilities
│   │   ├── utils.ts                    # General utilities
│   │   └── validators.ts               # Form validation schemas
│   ├── store/                          # State management
│   │   ├── authStore.ts                # Authentication store
│   │   └── voiceStore.ts               # Voice messages store
│   ├── types/                          # TypeScript type definitions
│   │   ├── auth.ts                     # Authentication types
│   │   ├── voice.ts                    # Voice message types
│   │   └── api.ts                      # API response types
│   └── styles/                         # Additional styles
│       └── components.css              # Component-specific styles
├── public/                             # Static assets
│   ├── icons/                          # Icon files
│   ├── images/                         # Image files
│   └── favicon.ico                     # Favicon
├── .env.example                        # Environment variables template
├── next.config.js                      # Next.js configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
└── package.json                        # Dependencies and scripts
```

---

## 🔧 Configuration

### **Environment Variables**
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_TIMEOUT=10000

# Authentication
NEXT_PUBLIC_JWT_STORAGE_KEY=sonexa_token
NEXT_PUBLIC_AUTH_REDIRECT_URL=/dashboard

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE=52428800  # 50MB
NEXT_PUBLIC_ACCEPTED_AUDIO_TYPES=audio/mpeg,audio/wav,audio/mp4

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=false
```

### **Next.js Configuration**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 🚀 Development

### **Installation & Setup**
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm test             # Run tests
```

### **Development Workflow**
1. **Create Component**: Use TypeScript interfaces
2. **Add Tests**: Write unit tests for components
3. **Update Types**: Add type definitions to `/types`
4. **Document**: Update README for significant changes

---

## 🔐 Authentication System

### **Auth Flow**
```typescript
// Login Process
1. User submits credentials → LoginForm
2. API call → /api/auth/login
3. JWT token received → stored in localStorage
4. User state updated → Zustand store
5. Redirect to dashboard

// Protected Routes
1. Route access → AuthGuard component
2. Token validation → useAuth hook
3. Redirect to login if invalid
```

### **Auth Hook Usage**
```typescript
const { user, login, logout, isLoading } = useAuth();

// Login
await login(email, password);

// Logout
logout();

// Access user data
console.log(user?.email);
```

---

## 🎵 Voice Message System

### **Upload Component**
```typescript
// VoiceUpload.tsx
- File selection with validation
- Progress tracking
- Error handling
- Success feedback
```

### **Voice Message Types**
```typescript
interface VoiceMessage {
  id: string;
  title: string;
  filename: string;
  duration: number;
  fileSize: number;
  uploadDate: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  transcription?: string;
}
```

---

## 🎨 UI Components

### **Design System**
- **Colors**: Tailwind CSS color palette
- **Typography**: Inter font family
- **Spacing**: 4px base unit system
- **Components**: Consistent button, input, card patterns

### **Component Library**
```typescript
// Button variants
<Button variant="primary" size="lg">Primary</Button>
<Button variant="secondary" size="md">Secondary</Button>

// Input types
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />

// Cards
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

---

## 📦 State Management

### **Zustand Stores**
```typescript
// Auth Store
interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Voice Messages Store
interface VoiceState {
  messages: VoiceMessage[];
  fetchMessages: () => Promise<void>;
  uploadMessage: (file: File) => Promise<void>;
}
```

---

## 🧪 Testing

### **Test Structure**
```bash
__tests__/
├── components/           # Component tests
├── hooks/               # Custom hook tests
├── utils/               # Utility function tests
└── pages/               # Page integration tests
```

### **Testing Commands**
```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

---

## 🚀 Deployment

### **Build Process**
```bash
# Production build
npm run build

# Static export (if needed)
npm run export
```

### **Digital Ocean App Platform**
```yaml
# .do/app.yaml
name: sonexa-ai-frontend
services:
- name: web
  source_dir: /
  github:
    repo: your-repo/sonexa-ai
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NEXT_PUBLIC_API_URL
    value: https://your-backend-url.com
```

---

## 📚 API Integration

### **API Client**
```typescript
// lib/api.ts
class ApiClient {
  private baseURL: string;
  private token: string | null;

  async post<T>(endpoint: string, data: any): Promise<T> {
    // Implementation with auth headers
  }

  async get<T>(endpoint: string): Promise<T> {
    // Implementation with auth headers
  }
}
```

### **Error Handling**
```typescript
// Global error handling
try {
  await api.post('/voice-messages/upload', formData);
} catch (error) {
  if (error.status === 401) {
    // Redirect to login
  } else {
    // Show error toast
  }
}
```

---

## 🔧 Troubleshooting

### **Common Issues**
1. **Build Errors**: Check TypeScript types
2. **API Connection**: Verify NEXT_PUBLIC_API_URL
3. **Authentication**: Clear localStorage and re-login
4. **Upload Issues**: Check file size and type validation

### **Debug Mode**
```bash
# Enable debug logging
DEBUG=sonexa:* npm run dev
```

---

*Last Updated: July 13, 2025*  
*Version: 1.0.0*  
*Documentation Standard: Comprehensive updates required for all changes*

2. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
```

### Running the Application

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

The application will be available at http://localhost:3000

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── pricing/           # Pricing page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── chat/              # Chat interface components
│   └── subscription/      # Subscription components
├── lib/                   # Utility libraries
│   └── api.ts            # API service
├── store/                 # State management
│   └── auth.ts           # Authentication store
└── types/                 # TypeScript type definitions
    ├── auth.ts           # Authentication types
    ├── ai.ts             # AI processing types
    └── subscription.ts   # Subscription types
```

## API Integration

The frontend integrates with the Spring Boot backend API:

- **Authentication**: `/auth/login`, `/auth/register`
- **AI Processing**: `/ai/chat`, `/ai/process-text`
- **Subscriptions**: `/stripe/create-checkout-session`

## Features Detail

### Authentication

- JWT-based authentication with persistent login
- User registration and login forms
- Protected routes with automatic redirection

### AI Chat Interface

- Real-time chat with AI assistants
- Tier-based routing display
- Message history management
- Loading states and error handling

### Subscription Management

- Pricing plans display
- Stripe Checkout integration
- Subscription status tracking
- Plan upgrade/downgrade options

### State Management

- Zustand for client state (authentication)
- React Query for server state (API calls)
- Persistent authentication state

## Development

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

### Architecture

- Component-based architecture
- Separation of concerns
- Custom hooks for reusable logic
- Centralized API service

## Deployment

The application can be deployed to:

- Vercel (recommended for Next.js)
- Netlify
- Docker containers
- Traditional web servers

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_API_BASE_URL`: Backend API base URL
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test all user flows
4. Update documentation for new features

## License

This project is part of the Sonexa AI platform.
