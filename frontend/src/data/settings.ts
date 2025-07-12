// Types for settings
export interface SettingsData {
  customVoiceEmail: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  timezone: string;
  company: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  voiceMessageID: string;
  responseLanguage: string;
  processingMode: string;
  responseTone: string;
  quietHoursStart: string;
  quietHoursEnd: string;
  notificationFrequency: string;
  companyIdentifier: string;
  emailVerificationStatus: "pending" | "verified" | "failed";
  lastVerificationAttempt?: Date;
}

export interface EmailVerification {
  id: string;
  companyIdentifier: string;
  companyEmail: string;
  securityCode: string;
  teamCode: string;
  status: "pending" | "verified" | "expired" | "failed";
  createdAt: Date;
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
}

export interface CompanyEmailConfig {
  baseEmail: string; // e.g., "voice@sonexa.ai"
  companyIdentifier: string; // e.g., "acme123"
  generatedEmail: string; // e.g., "voice+acme123@sonexa.ai"
  isVerified: boolean;
  verificationCode?: string;
}

// Mock settings data
export const mockSettingsData: SettingsData = {
  customVoiceEmail: "voice+sonexa-vm-12345-abcdef@sonexa.ai",
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  timezone: "America/New_York",
  company: "Acme Corporation",
  phoneNumber: "+1 (555) 123-4567",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@acme.com",
  voiceMessageID: "sonexa-vm-12345-abcdef",
  responseLanguage: "en",
  processingMode: "auto",
  responseTone: "professional",
  quietHoursStart: "22:00",
  quietHoursEnd: "08:00",
  notificationFrequency: "immediate",
  companyIdentifier: "sonexa-vm-12345-abcdef",
  emailVerificationStatus: "verified",
  lastVerificationAttempt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
};

// Mock email verifications
export const mockEmailVerifications: EmailVerification[] = [
  {
    id: "verification-1",
    companyIdentifier: "sonexa-vm-12345-abcdef",
    companyEmail: "voice+sonexa-vm-12345-abcdef@sonexa.ai",
    securityCode: "SONEXA-VM-12345-ABCDEF-2024-VRF",
    teamCode: "SONEXA-VM-12345-ABCDEF-2024-VRF",
    status: "verified",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
    verifiedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    attempts: 1,
    maxAttempts: 3,
  },
];

// Server-side data fetching functions
export async function fetchSettings(): Promise<SettingsData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockSettingsData;
}

export async function updateSettings(
  newSettings: Partial<SettingsData>
): Promise<SettingsData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // In a real app, this would update the database
  const updatedSettings = { ...mockSettingsData, ...newSettings };

  // Update the mock data (in a real app, this would be persisted)
  Object.assign(mockSettingsData, updatedSettings);

  return updatedSettings;
}

export async function generateCompanyEmail(voiceMessageId: string): Promise<CompanyEmailConfig> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const baseEmail = "voice@sonexa.ai";
  const generatedEmail = `voice+${voiceMessageId}@sonexa.ai`;
  
  return {
    baseEmail,
    companyIdentifier: voiceMessageId,
    generatedEmail,
    isVerified: false,
    verificationCode: undefined,
  };
}

export async function sendVerificationEmail(voiceMessageId: string, teamCode: string): Promise<EmailVerification> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const securityCode = `${voiceMessageId.toUpperCase()}-${new Date().getFullYear()}-VRF`;
  const companyEmail = `voice+${voiceMessageId}@sonexa.ai`;
  
  const verification: EmailVerification = {
    id: `verification-${Date.now()}`,
    companyIdentifier: voiceMessageId,
    companyEmail,
    securityCode,
    teamCode,
    status: "pending",
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    attempts: 0,
    maxAttempts: 3,
  };
  
  // Simulate sending email with security code
  console.log(`Verification email sent for voice message ${voiceMessageId}`);
  console.log(`Security code: ${securityCode}`);
  console.log(`This code should match team code: ${teamCode}`);
  
  return verification;
}

export async function verifySecurityCode(
  verificationId: string, 
  enteredCode: string, 
  teamCode: string
): Promise<{ success: boolean; message: string; verification?: EmailVerification }> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Find verification by ID
  const verification = mockEmailVerifications.find(v => v.id === verificationId);
  
  if (!verification) {
    return { success: false, message: "Verification not found" };
  }
  
  if (verification.status === "expired" || new Date() > verification.expiresAt) {
    return { success: false, message: "Verification code has expired" };
  }
  
  if (verification.attempts >= verification.maxAttempts) {
    return { success: false, message: "Maximum verification attempts exceeded" };
  }
  
  verification.attempts += 1;
  
  // Check if security code matches team code
  if (enteredCode !== verification.securityCode || verification.securityCode !== teamCode) {
    if (verification.attempts >= verification.maxAttempts) {
      verification.status = "failed";
      return { success: false, message: "Maximum attempts reached. Please request a new verification code." };
    }
    return { 
      success: false, 
      message: `Security code does not match. ${verification.maxAttempts - verification.attempts} attempts remaining.` 
    };
  }
  
  // Success - codes match
  verification.status = "verified";
  verification.verifiedAt = new Date();
  
  return { 
    success: true, 
    message: "Email successfully verified for your company!", 
    verification 
  };
}

export async function getEmailVerifications(companyIdentifier: string): Promise<EmailVerification[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockEmailVerifications.filter(v => v.companyIdentifier === companyIdentifier);
}

export async function regenerateCompanyIdentifier(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Generate a new unique identifier
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}${randomStr}`;
}
