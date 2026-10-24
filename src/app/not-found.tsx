import { AppErrorView } from "@basepoint-lab/layout";

export default function NotFound() {
  return (
    <AppErrorView
      appName="Mail"
      statusCode={404}
    />
  );
}
