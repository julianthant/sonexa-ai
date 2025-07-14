import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// API functions
const api = {
  voiceMessages: {
    getList: async (
      params: {
        page?: number;
        size?: number;
        search?: string;
        status?: string;
        response?: string;
      } = {}
    ) => {
      const token = localStorage.getItem("authToken");
      const searchParams = new URLSearchParams({
        page: (params.page || 0).toString(),
        size: (params.size || 10).toString(),
      });

      if (params.search) searchParams.append("search", params.search);
      if (params.status) searchParams.append("status", params.status);
      if (params.response) searchParams.append("response", params.response);

      const response = await fetch(`/api/voice-messages?${searchParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch voice messages");
      return response.json();
    },
    getById: async (id: string) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/voice-messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch voice message");
      return response.json();
    },
    updateResponse: async (data: {
      id: string;
      response: string;
      responseText?: string;
    }) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/voice-messages/${data.id}/response`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          response: data.response,
          responseText: data.responseText,
        }),
      });
      if (!response.ok) throw new Error("Failed to update response");
      return response.json();
    },
    delete: async (id: string) => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/voice-messages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete voice message");
      return response.json();
    },
  },
};

// Voice message hooks
export const useVoiceMessages = (
  params: {
    page?: number;
    size?: number;
    search?: string;
    status?: string;
    response?: string;
  } = {}
) => {
  return useQuery({
    queryKey: ["voiceMessages", params],
    queryFn: () => api.voiceMessages.getList(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    placeholderData: (previousData) => previousData,
  });
};

export const useVoiceMessage = (id: string) => {
  return useQuery({
    queryKey: ["voiceMessage", id],
    queryFn: () => api.voiceMessages.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateVoiceMessageResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.voiceMessages.updateResponse,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["voiceMessages"] });
      queryClient.invalidateQueries({
        queryKey: ["voiceMessage", variables.id],
      });
      toast.success("Response updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update response");
    },
  });
};

export const useDeleteVoiceMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.voiceMessages.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voiceMessages"] });
      toast.success("Voice message deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete voice message");
    },
  });
};
