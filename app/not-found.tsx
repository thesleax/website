import { ErrorView } from "@/components/error-view";

export default function NotFound() {
  return (
    <ErrorView
      code="404"
      title="Not Found"
      description="The page you're looking for doesn't exist or has moved."
    />
  );
}
