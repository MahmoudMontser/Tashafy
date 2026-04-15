"use client";

import api from "@/lib/api/useApi";

type ReservationPayload = {
  source: string;
  reservation_type: "program" | "package" | "provider" | "product";
  item_name: string;
  provider_name?: string;
  whatsapp_number?: string;
  metadata?: Record<string, unknown>;
};

type ReservationResponse = {
  whatsapp_url?: string | null;
};

function extractWhatsappNumber(fallbackHref: string): string | undefined {
  const match = fallbackHref.match(/wa\.me\/(\d+)/);
  return match?.[1];
}

export async function logReservationAttempt(payload: ReservationPayload): Promise<string | null> {
  try {
    const { data } = await api.post<ReservationResponse>("/public/reservation-attempts", payload);
    return data?.whatsapp_url || null;
  } catch {
    return null;
  }
}

export async function logAndOpenWhatsapp(payload: ReservationPayload, fallbackHref: string): Promise<void> {
  if (typeof window === "undefined") return;

  const whatsappNumber = payload.whatsapp_number || extractWhatsappNumber(fallbackHref);
  const resultUrl = await logReservationAttempt({
    ...payload,
    whatsapp_number: whatsappNumber,
    metadata: {
      ...(payload.metadata || {}),
      fallback_href: fallbackHref,
    },
  });

  const targetUrl = resultUrl || fallbackHref;
  window.open(targetUrl, "_blank", "noopener,noreferrer");
}
