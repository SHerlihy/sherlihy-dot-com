import { createFileRoute } from "@tanstack/react-router";
import VelmaMode from "@/pages/highlights/VelmaMode";

export const Route = createFileRoute("/highlight/velma-mode")({
  component: VelmaMode,
});
