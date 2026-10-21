import { createFileRoute } from "@tanstack/react-router";
import I2Group from "@/pages/highlights/I2Group";

export const Route = createFileRoute("/highlight/i2-group")({
  component: I2Group,
});
