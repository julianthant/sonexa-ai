"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { loadStripe } from "@stripe/stripe-js";
import { apiService } from "@/lib/api";
import { SUBSCRIPTION_TIERS } from "@/types/subscription";
import type { SubscriptionTier } from "@/types/subscription";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function PricingPlans() {
  const { user } = useAuthStore();

  const handleSubscribe = async (tier: SubscriptionTier) => {
    if (tier.id === "free") {
      toast("You are already on the free plan", { icon: "ℹ️" });
      return;
    }

    try {
      const response = await apiService.createCheckoutSession(
        tier.stripe_price_id
      );

      if (response.success && response.data) {
        const stripe = await stripePromise;
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({
            sessionId: response.data.sessionId,
          });

          if (error) {
            toast.error("Failed to redirect to checkout");
          }
        }
      } else {
        toast.error(
          response.error?.message || "Failed to create checkout session"
        );
      }
    } catch (error) {
      toast.error("An error occurred while processing your request");
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <h2 className="font-bold text-gray-900 text-3xl sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Select the perfect plan for your AI processing needs
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {SUBSCRIPTION_TIERS.map((tier) => {
            const isCurrentTier = user?.subscription_tier === tier.id;
            const isFreeTier = tier.id === "free";

            return (
              <div
                key={tier.id}
                className={`relative rounded-lg border ${
                  tier.recommended
                    ? "border-blue-500 shadow-lg scale-105"
                    : "border-gray-200 shadow-md"
                } bg-white p-6`}
              >
                {tier.recommended && (
                  <div className="-top-3 left-1/2 absolute -translate-x-1/2 transform">
                    <span className="bg-blue-500 px-3 py-1 rounded-full font-medium text-white text-sm">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {tier.name}
                  </h3>
                  <div className="mt-4">
                    <span className="font-bold text-gray-900 text-4xl">
                      ${tier.price}
                    </span>
                    {!isFreeTier && (
                      <span className="text-gray-600">/{tier.interval}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mt-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="flex-shrink-0 mt-0.5 mr-3 w-5 h-5 text-green-500" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {isCurrentTier ? (
                    <button
                      disabled
                      className="bg-gray-100 px-4 py-2 rounded-md w-full font-medium text-gray-500 cursor-not-allowed"
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(tier)}
                      className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                        tier.recommended
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : isFreeTier
                          ? "bg-gray-600 text-white hover:bg-gray-700"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {isFreeTier ? "Get Started" : "Subscribe"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            All plans include our core AI processing features. Upgrade or
            downgrade anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
