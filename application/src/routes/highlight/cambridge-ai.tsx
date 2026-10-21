import { createFileRoute } from "@tanstack/react-router";
import CambridgeAI from "@/pages/highlights/CambridgeAI";

export const Route = createFileRoute("/highlight/cambridge-ai")({
  component: CambridgeAI,
});
