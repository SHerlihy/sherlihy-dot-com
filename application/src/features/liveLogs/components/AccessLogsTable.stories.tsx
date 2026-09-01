import type { Meta, StoryObj } from "@storybook/tanstack-react";

import AccessLogsTable from "./AccessLogsTable.tsx";
import { Route } from "../../../routes/observe.tsx";
import { createDummyLogDisplayData } from "../testHelpers.ts";

const meta = {
  title: "Live Logs/AccessLogsTable",
  component: AccessLogsTable,
  args: {
    orderedLogs: [createDummyLogDisplayData()],
  },
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
} satisfies Meta<typeof AccessLogsTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
