import { createFileRoute } from "@tanstack/react-router";
import AWSCerts from "@/pages/highlights/AWSCerts";

export const Route = createFileRoute("/highlight/aws-certificates")({
  component: AWSCerts,
});
