import { createFileRoute } from "@tanstack/react-router";
import TechWeek from "@/pages/highlights/TechWeek";

export const Route = createFileRoute("/highlight/tech-week")({
  component: TechWeek,
});
