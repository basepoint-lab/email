"use client";

import { AppErrorView } from "@basepoint-lab/layout";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppErrorView
      appName="Mail"
      statusCode={500}
      error={error}
      reset={reset}
    />
  );
}
