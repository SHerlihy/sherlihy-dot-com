import { createFileRoute } from "@tanstack/react-router";
import SoftwareCrafters from "@/pages/highlights/SoftwareCrafters";

export const Route = createFileRoute("/highlight/software-crafters")({
  component: SoftwareCrafters,
});
