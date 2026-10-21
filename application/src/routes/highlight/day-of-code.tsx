import { createFileRoute } from "@tanstack/react-router";
import DayOfCode from "@/pages/highlights/DayOfCode";

export const Route = createFileRoute("/highlight/day-of-code")({
  component: DayOfCode,
});
