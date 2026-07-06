"use client";

import { FiRefreshCw } from "react-icons/fi";
import { ErrorView } from "@/components/error-view";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorView
      code="500"
      title="Something went wrong"
      description={error.message || "An unexpected error occurred."}
      action={
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
        >
          <FiRefreshCw className="size-4" />
          Try again
        </button>
      }
    />
  );
}
