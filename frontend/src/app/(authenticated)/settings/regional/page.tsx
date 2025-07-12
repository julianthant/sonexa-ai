import Link from "next/link";
import { Globe, Clock, MapPin, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegionalPage() {
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
            Regional settings
          </h1>
          <p className="text-gray-600 text-sm">
            Configure timezone, language, and regional preferences
          </p>
        </div>
      </div>

      {/* Timezone Settings */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Timezone</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Primary timezone
            </label>
            <Select defaultValue="america/los_angeles">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="america/los_angeles">
                  (UTC-08:00) Pacific Time - Los Angeles
                </SelectItem>
                <SelectItem value="america/new_york">
                  (UTC-05:00) Eastern Time - New York
                </SelectItem>
                <SelectItem value="america/chicago">
                  (UTC-06:00) Central Time - Chicago
                </SelectItem>
                <SelectItem value="america/denver">
                  (UTC-07:00) Mountain Time - Denver
                </SelectItem>
                <SelectItem value="europe/london">
                  (UTC+00:00) Greenwich Mean Time - London
                </SelectItem>
                <SelectItem value="europe/paris">
                  (UTC+01:00) Central European Time - Paris
                </SelectItem>
                <SelectItem value="asia/tokyo">
                  (UTC+09:00) Japan Standard Time - Tokyo
                </SelectItem>
                <SelectItem value="australia/sydney">
                  (UTC+11:00) Australian Eastern Time - Sydney
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-1 text-gray-600 text-sm">
              Current time: Tuesday, January 15, 2025 at 2:30 PM
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Automatic timezone detection
              </h3>
              <p className="text-gray-600 text-sm">
                Automatically update timezone based on your location
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">
          Language & Localization
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Interface language
            </label>
            <Select defaultValue="en">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español (Spanish)</SelectItem>
                <SelectItem value="fr">Français (French)</SelectItem>
                <SelectItem value="de">Deutsch (German)</SelectItem>
                <SelectItem value="it">Italiano (Italian)</SelectItem>
                <SelectItem value="pt">Português (Portuguese)</SelectItem>
                <SelectItem value="ja">日本語 (Japanese)</SelectItem>
                <SelectItem value="ko">한국어 (Korean)</SelectItem>
                <SelectItem value="zh">中文 (Chinese)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Voice transcription language
            </label>
            <Select defaultValue="en-us">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-us">English (US)</SelectItem>
                <SelectItem value="en-gb">English (UK)</SelectItem>
                <SelectItem value="es-es">Spanish (Spain)</SelectItem>
                <SelectItem value="es-mx">Spanish (Mexico)</SelectItem>
                <SelectItem value="fr-fr">French (France)</SelectItem>
                <SelectItem value="de-de">German (Germany)</SelectItem>
                <SelectItem value="it-it">Italian (Italy)</SelectItem>
                <SelectItem value="pt-br">Portuguese (Brazil)</SelectItem>
                <SelectItem value="ja-jp">Japanese (Japan)</SelectItem>
                <SelectItem value="ko-kr">Korean (South Korea)</SelectItem>
                <SelectItem value="zh-cn">Chinese (Simplified)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Auto-detect voice language
              </h3>
              <p className="text-gray-600 text-sm">
                Automatically detect the language of voice messages
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Date & Time Format */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Date & Time Format</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Date format
            </label>
            <Select defaultValue="mm/dd/yyyy">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mm/dd/yyyy">
                  MM/DD/YYYY (01/15/2025)
                </SelectItem>
                <SelectItem value="dd/mm/yyyy">
                  DD/MM/YYYY (15/01/2025)
                </SelectItem>
                <SelectItem value="yyyy-mm-dd">
                  YYYY-MM-DD (2025-01-15)
                </SelectItem>
                <SelectItem value="dd-mmm-yyyy">
                  DD-MMM-YYYY (15-Jan-2025)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Time format
            </label>
            <Select defaultValue="12h">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12-hour (2:30 PM)</SelectItem>
                <SelectItem value="24h">24-hour (14:30)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Week starts on
            </label>
            <Select defaultValue="sunday">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Number & Currency Format */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">
          Number & Currency Format
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Currency
            </label>
            <Select defaultValue="usd">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($) - US Dollar</SelectItem>
                <SelectItem value="eur">EUR (€) - Euro</SelectItem>
                <SelectItem value="gbp">GBP (£) - British Pound</SelectItem>
                <SelectItem value="jpy">JPY (¥) - Japanese Yen</SelectItem>
                <SelectItem value="cad">CAD (C$) - Canadian Dollar</SelectItem>
                <SelectItem value="aud">
                  AUD (A$) - Australian Dollar
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Number format
            </label>
            <Select defaultValue="1234.56">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1234.56">1,234.56 (US/UK)</SelectItem>
                <SelectItem value="1234,56">1.234,56 (European)</SelectItem>
                <SelectItem value="1 234,56">1 234,56 (French)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Regional Privacy */}
      <div className="space-y-4">
        <h2 className="font-bold text-gray-900 text-lg">Regional Privacy</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">GDPR compliance</h3>
              <p className="text-gray-600 text-sm">
                Enable GDPR-compliant data handling for EU users
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Data residency</h3>
              <p className="text-gray-600 text-sm">
                Keep data within your selected region
              </p>
            </div>
            <Switch />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Preferred data region
            </label>
            <Select defaultValue="us-west">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-west">US West (California)</SelectItem>
                <SelectItem value="us-east">US East (Virginia)</SelectItem>
                <SelectItem value="eu-west">EU West (Ireland)</SelectItem>
                <SelectItem value="eu-central">EU Central (Germany)</SelectItem>
                <SelectItem value="asia-pacific">
                  Asia Pacific (Singapore)
                </SelectItem>
                <SelectItem value="canada">Canada (Central)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
