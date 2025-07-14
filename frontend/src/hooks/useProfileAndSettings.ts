import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// API functions
const api = {
  profile: {
    get: async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch profile");
      return response.json();
    },
    update: async (data: any) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      return response.json();
    },
    changePassword: async (data: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/profile/password", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to change password");
      return response.json();
    },
  },
  settings: {
    get: async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch settings");
      return response.json();
    },
    updateNotifications: async (data: any) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/settings/notifications", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error("Failed to update notification settings");
      return response.json();
    },
    updateVoiceEmail: async (data: { customVoiceEmail: string }) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/settings/voice-email", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error("Failed to update voice email settings");
      return response.json();
    },
  },
};

// Profile hooks
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: api.profile.get,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.profile.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: api.profile.changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to change password");
    },
  });
};

// Settings hooks
export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: api.settings.get,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.settings.updateNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Notification settings updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update notification settings");
    },
  });
};

export const useUpdateVoiceEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.settings.updateVoiceEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Voice email settings updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update voice email settings");
    },
  });
};
