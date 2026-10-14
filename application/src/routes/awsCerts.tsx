import { createFileRoute } from "@tanstack/react-router";
import AWSCerts from "@/pages/AWSCerts";

export const Route = createFileRoute("/awsCerts")({
  component: AWSCerts,
});
