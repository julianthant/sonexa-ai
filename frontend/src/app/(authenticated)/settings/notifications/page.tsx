import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm">
          <Link
            href="/settings"
            className="text-purple-600 hover:text-purple-700"
          >
            Settings
          </Link>
          <span className="text-gray-400">›</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="mb-1 font-bold text-gray-900 text-2xl">
            Notification preferences
          </h1>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="space-y-6">
        <div>
          <h2 className="mb-4 font-bold text-gray-900 text-lg">
            Email notifications
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="voiceMessages"
                  className="font-medium text-gray-900 text-sm"
                >
                  Voice message notifications
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Get notified when you receive new voice messages
                </p>
              </div>
              <Switch id="voiceMessages" defaultChecked />
            </div>

            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="transcriptions"
                  className="font-medium text-gray-900 text-sm"
                >
                  Transcription complete
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Get notified when voice message transcription is complete
                </p>
              </div>
              <Switch id="transcriptions" defaultChecked />
            </div>

            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="teamActivity"
                  className="font-medium text-gray-900 text-sm"
                >
                  Team activity
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Get notified about team member activities and collaborations
                </p>
              </div>
              <Switch id="teamActivity" defaultChecked />
            </div>

            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="security"
                  className="font-medium text-gray-900 text-sm"
                >
                  Security alerts
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Get notified about important security events
                </p>
              </div>
              <Switch id="security" defaultChecked />
            </div>

            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="productUpdates"
                  className="font-medium text-gray-900 text-sm"
                >
                  Product updates
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Get notified about new features and product updates
                </p>
              </div>
              <Switch id="productUpdates" />
            </div>
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="pt-8 border-t">
        <div>
          <h2 className="mb-4 font-bold text-gray-900 text-lg">
            Push notifications
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="pushVoiceMessages"
                  className="font-medium text-gray-900 text-sm"
                >
                  Voice message alerts
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Receive push notifications for new voice messages
                </p>
              </div>
              <Switch id="pushVoiceMessages" defaultChecked />
            </div>

            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="pushMentions"
                  className="font-medium text-gray-900 text-sm"
                >
                  Mentions and replies
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Get notified when someone mentions you or replies to your
                  message
                </p>
              </div>
              <Switch id="pushMentions" defaultChecked />
            </div>

            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="pushReminders"
                  className="font-medium text-gray-900 text-sm"
                >
                  Reminders
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Get reminded about pending voice messages and tasks
                </p>
              </div>
              <Switch id="pushReminders" />
            </div>
          </div>
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="pt-8 border-t">
        <div>
          <h2 className="mb-4 font-bold text-gray-900 text-lg">
            SMS notifications
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="smsUrgent"
                  className="font-medium text-gray-900 text-sm"
                >
                  Urgent voice messages
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Receive SMS for urgent voice messages when marked as priority
                </p>
              </div>
              <Switch id="smsUrgent" />
            </div>

            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="smsSecurity"
                  className="font-medium text-gray-900 text-sm"
                >
                  Security verification
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Receive SMS for two-factor authentication and security alerts
                </p>
              </div>
              <Switch id="smsSecurity" defaultChecked />
            </div>
          </div>
        </div>
      </div>

      {/* Voice Notifications */}
      <div className="pt-8 border-t">
        <div>
          <h2 className="mb-4 font-bold text-gray-900 text-lg">
            Voice notifications
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="voicePlayback"
                  className="font-medium text-gray-900 text-sm"
                >
                  Auto-playback notifications
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Automatically play voice message notifications through
                  speakers
                </p>
              </div>
              <Switch id="voicePlayback" defaultChecked />
            </div>

            <div className="flex justify-between items-center py-3 border-gray-100 border-b">
              <div>
                <Label
                  htmlFor="voiceCallouts"
                  className="font-medium text-gray-900 text-sm"
                >
                  Voice callouts
                </Label>
                <p className="mt-1 text-gray-600 text-sm">
                  Receive spoken notifications for important voice messages
                </p>
              </div>
              <Switch id="voiceCallouts" />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-6 border-t">
        <Button className="bg-purple-600 hover:bg-purple-700">
          Save preferences
        </Button>
      </div>
    </div>
  );
}
