import { createFileRoute } from "@tanstack/react-router";
import VelmaMode from "@/pages/VelmaMode";

export const Route = createFileRoute("/velmaMode")({
  component: VelmaMode,
});
