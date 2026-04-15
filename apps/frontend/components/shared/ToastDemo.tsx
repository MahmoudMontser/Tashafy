"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => toast("Default message")}>
        Default
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.success("Saved successfully!")}>
        Success
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.error("Something went wrong")}>
        Error
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.warning("Please check the form")}>
        Warning
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: "Loading...",
            success: "Done!",
            error: "Failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  );
}
