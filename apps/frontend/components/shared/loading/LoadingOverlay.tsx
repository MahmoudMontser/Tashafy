import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";

type LoadingOverlayProps = {
  open: boolean;
  message?: string;
};

export function LoadingOverlay({ open, message = "Loading..." }: LoadingOverlayProps) {
  if (!open) return null;

  const overlay = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center backdrop-blur-sm" role="status" aria-live="polite" aria-label="Loading">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-secondary" aria-hidden />
        <span className="text-sm text-white">{message}</span>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(overlay, document.body);
  }

  return null;
}
