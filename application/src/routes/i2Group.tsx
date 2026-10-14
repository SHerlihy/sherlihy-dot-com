import { createFileRoute } from "@tanstack/react-router";
import I2Group from "@/pages/I2Group";

export const Route = createFileRoute("/i2Group")({
  component: I2Group,
});
