import type { Meta, StoryObj } from "@storybook/tanstack-react";

import AccessLogs from "./AccessLogs.tsx";
import { Route } from "../../routes/observe.tsx";

const meta = {
  title: "Live AccessLogs",
  component: AccessLogs,
  parameters: {
    tanstack: {
      router: {
        route: Route,
        path: "/observe",
        query: {
          deselected: 0,
        },
      },
    },
  },
} satisfies Meta<typeof AccessLogs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
