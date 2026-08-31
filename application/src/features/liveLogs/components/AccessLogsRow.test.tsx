// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, spyOn } from "vitest";
import userEvent from "@testing-library/user-event";

import { Route } from "../../../routes";
import { CloudFrontLogPayload, columnOrder } from "../definitions.ts";

import { useCloudwatchLogs } from "../useCloudwatchLogs";

describe("AccessLogsRow", () => {
  beforeEach(() => {
    const mockSpy = spyOn(useCloudwatchLogs, "default").mockReturnValue({
      getLog: (id: string) => {},
    });
  });
});

test("renders with fake hook data", () => {
  // 1. Fake the hook implementation
  const mockSpy = jest.spyOn(useCustomHookModule, "default").mockReturnValue({
    data: "faked data",
    loading: false,
  });

  // 2. Render your component
  render(<MyComponent />);

  // 3. Assert
  expect(screen.getByText("faked data")).toBeInTheDocument();

  // 4. Clean up
  mockSpy.mockRestore();
});
