// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import { vi, afterEach, describe, expect, it } from "vitest";
import { renderWithRouter } from "../../../test/renderWithRouter.tsx";
import { createDummyLogDisplayData } from "../testHelpers.ts";

import { columnOrder } from "../definitions.ts";
import { Route } from "../../../routes";

import AccessLogDisplayData from "./AccessLogDisplayData.tsx";

describe("AccessLogsRow", () => {
  const useSearchSpy = vi.spyOn(Route, "useSearch").mockReturnValue({
    deselected: 0,
  });

  const dummyData = createDummyLogDisplayData();

  afterEach(() => {
    useSearchSpy.mockRestore();
  });

  it("renders data in order", async () => {
    await renderWithRouter(
      <AccessLogDisplayData logDisplayData={dummyData} />,
      {
        initialEntry: `/observe?deselected=0`,
      },
    );

    Object.values(dummyData).forEach((val) => {
      expect(screen.getByText("" + val));
    });
  });

  it("does not render deselected data", async () => {
    const idxDeselect = Math.floor(Math.random() * columnOrder.length);

    await renderWithRouter(
      <AccessLogDisplayData logDisplayData={dummyData} />,
      {
        initialEntry: `/observe?deselected=${idxDeselect + 1}`,
      },
    );

    const deselectKey = columnOrder[idxDeselect].objKey;

    const deselectedEl = screen.queryByText(deselectKey);

    expect(deselectedEl).toBeNull();
  });
});
