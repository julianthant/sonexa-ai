export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
  stripe_price_id: string;
  recommended?: boolean;
}

export interface Subscription {
  id: string;
  tier: string;
  status: "active" | "inactive" | "canceled" | "past_due";
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export interface CheckoutSession {
  sessionId: string;
  checkoutUrl: string;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    currency: "USD",
    interval: "month",
    features: [
      "Basic AI processing",
      "Azure AI integration",
      "Limited requests per day",
      "Community support",
    ],
    stripe_price_id: "",
  },
  {
    id: "basic",
    name: "Basic",
    price: 19.99,
    currency: "USD",
    interval: "month",
    features: [
      "Advanced AI processing",
      "OpenAI GPT integration",
      "Unlimited requests",
      "Email support",
      "Priority processing",
    ],
    stripe_price_id: "price_basic_monthly",
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 79.99,
    currency: "USD",
    interval: "month",
    features: [
      "Premium AI models",
      "Advanced analytics",
      "Custom integrations",
      "Priority support",
      "API access",
      "Team collaboration",
    ],
    stripe_price_id: "price_premium_monthly",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 299.99,
    currency: "USD",
    interval: "month",
    features: [
      "Enterprise AI suite",
      "Custom model training",
      "Dedicated support",
      "SLA guarantees",
      "Custom deployment",
      "Advanced security",
    ],
    stripe_price_id: "price_enterprise_monthly",
  },
];
