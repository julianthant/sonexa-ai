# Sonexa AI Frontend

A modern Next.js 14 frontend application for the Sonexa AI platform, featuring tier-based AI processing with intelligent routing between Azure AI and OpenAI.

## Features

- **Authentication System**: Login and registration with JWT token management
- **Tier-Based AI Chat**: Intelligent routing based on subscription level
  - Free tier: Azure AI integration
  - Paid tiers: OpenAI integration
- **Subscription Management**: Stripe-powered subscription system
- **Modern UI**: Built with Tailwind CSS and Heroicons
- **Real-time Chat**: Interactive AI chat interface
- **Responsive Design**: Mobile-first responsive design

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Server state management
- **Zustand**: Client state management
- **React Hook Form**: Form management
- **Stripe.js**: Payment processing
- **React Hot Toast**: Notifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on http://localhost:8080

### Installation

1. Install dependencies:

```bash
npm install
```

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
