import Link from "next/link";
import {
  Mic,
  Volume2,
  Settings2,
  FileAudio,
  Play,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function VoicePage() {
  const tabs = [
    { id: "recording", name: "Recording", active: true },
    { id: "transcription", name: "Transcription", active: false },
    { id: "playback", name: "Playback", active: false },
    { id: "sharing", name: "Sharing", active: false },
    { id: "storage", name: "Storage", active: false },
  ];

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
            Voice Messages
          </h1>
          <p className="text-gray-600 text-sm">
            Configure voice message settings, transcription, and sharing
            preferences
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-gray-200 border-b">
        <nav className="flex space-x-8 -mb-px">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/settings/voice?tab=${tab.id}`}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                tab.active
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Recording Settings */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Recording Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Audio quality
            </label>
            <Select defaultValue="high">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High Quality (48kHz)</SelectItem>
                <SelectItem value="medium">Medium Quality (32kHz)</SelectItem>
                <SelectItem value="low">Low Quality (16kHz)</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-1 text-gray-600 text-sm">
              Higher quality uses more storage space
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Maximum recording length
            </label>
            <Select defaultValue="300">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">1 minute</SelectItem>
                <SelectItem value="180">3 minutes</SelectItem>
                <SelectItem value="300">5 minutes</SelectItem>
                <SelectItem value="600">10 minutes</SelectItem>
                <SelectItem value="unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Auto-stop silence detection
              </h3>
              <p className="text-gray-600 text-sm">
                Automatically stop recording after 3 seconds of silence
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Noise cancellation</h3>
              <p className="text-gray-600 text-sm">
                Reduce background noise during recording
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Microphone Settings */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Microphone Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Default microphone
            </label>
            <Select defaultValue="default">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">System Default</SelectItem>
                <SelectItem value="builtin">Built-in Microphone</SelectItem>
                <SelectItem value="headset">Bluetooth Headset</SelectItem>
                <SelectItem value="usb">USB Microphone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Microphone sensitivity
            </label>
            <Select defaultValue="75">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">Low (25%)</SelectItem>
                <SelectItem value="50">Medium (50%)</SelectItem>
                <SelectItem value="75">High (75%)</SelectItem>
                <SelectItem value="100">Maximum (100%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Test microphone</h3>
              <p className="text-gray-600 text-sm">
                Record a test message to check audio quality
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Mic className="mr-2 w-4 h-4" />
              Test
            </Button>
          </div>
        </div>
      </div>

      {/* Transcription Settings */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">
          Transcription Settings
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Auto-transcription</h3>
              <p className="text-gray-600 text-sm">
                Automatically transcribe voice messages
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Transcription accuracy
            </label>
            <Select defaultValue="high">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High Accuracy (slower)</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="fast">Fast (lower accuracy)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Speaker identification
              </h3>
              <p className="text-gray-600 text-sm">
                Identify different speakers in group conversations
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Punctuation & formatting
              </h3>
              <p className="text-gray-600 text-sm">
                Add punctuation and formatting to transcriptions
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Playback Settings */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Playback Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Playback volume
            </label>
            <Select defaultValue="80">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">Quiet (25%)</SelectItem>
                <SelectItem value="50">Medium (50%)</SelectItem>
                <SelectItem value="80">High (80%)</SelectItem>
                <SelectItem value="100">Maximum (100%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Default playback speed
            </label>
            <Select defaultValue="1.0">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5x (Slow)</SelectItem>
                <SelectItem value="0.75">0.75x</SelectItem>
                <SelectItem value="1.0">1.0x (Normal)</SelectItem>
                <SelectItem value="1.25">1.25x</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
                <SelectItem value="2.0">2.0x (Fast)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Auto-play next message
              </h3>
              <p className="text-gray-600 text-sm">
                Automatically play the next message in queue
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Show waveform</h3>
              <p className="text-gray-600 text-sm">
                Display audio waveform during playback
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Sharing Settings */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Sharing Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Default sharing permissions
            </label>
            <Select defaultValue="private">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private (only me)</SelectItem>
                <SelectItem value="team">Team members only</SelectItem>
                <SelectItem value="organization">
                  Entire organization
                </SelectItem>
                <SelectItem value="public">Public (with link)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Include transcription in shares
              </h3>
              <p className="text-gray-600 text-sm">
                Automatically include transcription when sharing
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Expire shared links</h3>
              <p className="text-gray-600 text-sm">
                Shared links expire after 30 days
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Download protection</h3>
              <p className="text-gray-600 text-sm">
                Prevent others from downloading shared voice messages
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Storage Settings */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Storage Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Auto-delete old messages
            </label>
            <Select defaultValue="never">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="30">After 30 days</SelectItem>
                <SelectItem value="90">After 90 days</SelectItem>
                <SelectItem value="365">After 1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Compress old messages
              </h3>
              <p className="text-gray-600 text-sm">
                Compress messages older than 30 days to save space
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Storage usage</h3>
              <span className="text-gray-600 text-sm">2.4 GB / 10 GB</span>
            </div>
            <div className="bg-gray-200 mb-2 rounded-full h-2">
              <div className="bg-purple-600 rounded-full w-1/4 h-2"></div>
            </div>
            <p className="text-gray-600 text-sm">24% of storage used</p>
          </div>
        </div>
      </div>
    </div>
  );
}
