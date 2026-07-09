export type Division = "digitizebiz" | "citizenease";
export type ConsultationStatus = "new" | "contacted" | "in_progress" | "closed";

export interface Consultation {
  id: string;
  name: string;
  contact: string;
  division: Division;
  message: string;
  services: string[];
  status: ConsultationStatus;
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body?.error === "string") message = body.error;
    } catch {
      // Response wasn't JSON — keep the generic message.
    }
    throw new ApiError(res.status, message);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  submitConsultation(input: { name: string; contact: string; division: Division; message: string; services?: string[] }) {
    return request<{ ok: true; id: string }>("/api/consultations", {
      method: "POST",
      body: JSON.stringify({ services: [], ...input, website: "" }), // honeypot field, always empty from real users
    });
  },

  login(password: string) {
    return request<{ token: string; expiresIn: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
  },

  // token is optional because the admin login gate is currently disabled (trial run) — see
  // src/pages/AdminPage.tsx. Backend admin routes are open to match, so an absent token still
  // works; pass one if/when the login gate and backend requireAdmin check are both re-enabled.
  listConsultations(token?: string, filter?: { division?: Division; status?: ConsultationStatus }) {
    const params = new URLSearchParams();
    if (filter?.division) params.set("division", filter.division);
    if (filter?.status) params.set("status", filter.status);
    const qs = params.toString();
    return request<{ items: Consultation[]; counts: Record<ConsultationStatus, number> }>(
      `/api/consultations${qs ? `?${qs}` : ""}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
  },

  updateStatus(id: string, status: ConsultationStatus, token?: string) {
    return request<{ item: Consultation }>(`/api/consultations/${id}`, {
      method: "PATCH",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify({ status }),
    });
  },

  deleteConsultation(id: string, token?: string) {
    return request<void>(`/api/consultations/${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
};

export { ApiError };
