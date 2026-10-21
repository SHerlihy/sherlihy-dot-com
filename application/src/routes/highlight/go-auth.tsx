import { createFileRoute } from "@tanstack/react-router";
import GoAuth from "@/pages/highlights/GoAuth";

export const Route = createFileRoute("/highlight/go-auth")({
  component: GoAuth,
});
