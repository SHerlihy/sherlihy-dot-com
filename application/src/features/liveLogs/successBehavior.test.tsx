// @vitest-environment jsdom
import { cleanup, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "../../test/renderWithRouter.tsx";

import { FakeEventSource } from "../../test/FakeEventSource";
import AccessLogs from "./AccessLogs.tsx";

import { createDummyLogData } from "./testHelpers.ts";

import {
  columnTitles,
  CloudFrontLogEvent,
  LogEntryEvent,
} from "./definitions.ts";

describe("LiveLogs", () => {
  describe("component layout", () => {
    beforeEach(async () => {
      FakeEventSource.install();

      await renderWithRouter(<AccessLogs />, {
        initialEntry: `/observe?deselected=0`,
      });

      waitFor(() => {
        expect(FakeEventSource.instances[0]).toBeDefined();
      });
    });

    afterEach(() => {
      cleanup();
      FakeEventSource.uninstall();
    });

    columnTitles.forEach((title) => {
      it("initialises with ${title} field", async () => {
        const titleElements = screen.getAllByText(title);
        expect(titleElements.some((el) => el.tagName === "TH")).toBe(true);
      });
    });

    columnTitles.forEach((title) => {
      it("removes field with ${title}", async () => {
        const user = userEvent.setup();

        let titleElements = screen.getAllByText(title);
        const titleButton = titleElements.find((el) => el.tagName === "BUTTON");
        if (titleButton === undefined) {
          throw new Error(`Button with text '${title}' not found.`);
        }

        await user.click(titleButton);

        titleElements = screen.getAllByText(title);
        expect(titleElements.some((el) => el.tagName === "TH")).toBe(false);
      });
    });
  });

  describe("stream behaviour", () => {
    let dummyEventObjects: Array<CloudFrontLogEvent> = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const dummyAccessLog = createDummyLogData();

        const dummyLogEntryEvent: LogEntryEvent = {
          id: `Event-${i}`,
          event: "log_entry",
          data: dummyAccessLog,
        };

        dummyEventObjects.push(dummyLogEntryEvent);
      }

      FakeEventSource.install();

      await renderWithRouter(<AccessLogs />, {
        initialEntry: `/observe?deselected=0`,
      });

      waitFor(() => {
        expect(FakeEventSource.instances[0]).toBeDefined();
      });

      dummyEventObjects.forEach((dummyEvent) => {
        FakeEventSource.instances[0].emitMessage(dummyEvent);
      });
    });

    afterEach(() => {
      cleanup();
      FakeEventSource.uninstall();
      dummyEventObjects = [];
    });

    dummyEventObjects.forEach((dummyEvent, i) => {
      if (dummyEvent.id === undefined) {
        throw new Error(`Dummy data missing id at index ${i}`);
      }

      it(`renders event ${dummyEvent.id}`, async () => {
        screen.getByText(dummyEvent.id!);
      });
    });

    it.skip("renders streamed event", async () => {
      const streamedEventId = "streamedEventId";
      const freshLogData = createDummyLogData();

      const dummyLogEntryEvent: LogEntryEvent = {
        id: streamedEventId,
        event: "log_entry",
        data: freshLogData,
      };

      const idElementPreEmit = screen.queryByText(streamedEventId);
      expect(idElementPreEmit).toBeNull();

      FakeEventSource.instances[0].emitMessage(dummyLogEntryEvent);

      const idElement = await screen.findByText(streamedEventId);
      expect(idElement).not.toBeNull();
    });
  });
});
