import { createFileRoute } from "@tanstack/react-router";
import GoAuth from "@/pages/GoAuth";

export const Route = createFileRoute("/goAuth")({
  component: GoAuth,
});
