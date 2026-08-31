// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { FakeEventSource } from "../../test/FakeEventSource";
import LiveLogTable from "./LiveLogTable";

import { createDummyLogData } from "./testHelpers.ts";

import {
  columnTitles,
  CloudFrontLogEvent,
  LogEntryEvent,
} from "./definitions.ts";

describe("LiveLogs", () => {
  beforeEach(() => {
    FakeEventSource.install();
  });

  afterEach(() => {
    cleanup();
    FakeEventSource.uninstall();
  });

  describe("component layout", () => {
    columnTitles.forEach((title) => {
      it("initialises with ${title} field", () => {
        render(<LiveLogTable />);

        const titleElements = screen.getAllByText(title);
        expect(titleElements.some((el) => el.tagName === "TH")).toBe(true);
      });
    });

    columnTitles.forEach((title) => {
      it("removes field with ${title}", async () => {
        const user = userEvent.setup();

        render(<LiveLogTable />);

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

    beforeEach(() => {
      for (let i = 0; i < 3; i++) {
        const dummyAccessLog = createDummyLogData();

        const dummyLogEntryEvent: LogEntryEvent = {
          id: `Event-${i}`,
          event: "log_entry",
          data: dummyAccessLog,
        };

        dummyEventObjects.push(dummyLogEntryEvent);
      }

      dummyEventObjects.forEach((dummyEvent) => {
        FakeEventSource.instances[0].emitMessage(dummyEvent);
      });
    });

    afterEach(() => {
      dummyEventObjects = [];
    });

    dummyEventObjects.forEach((dummyEvent, i) => {
      if (dummyEvent.id === undefined) {
        throw new Error(`Dummy data missing id at index ${i}`);
      }

      it(`renders event ${dummyEvent.id}`, () => {
        render(<LiveLogTable />);

        screen.getByText(dummyEvent.id!);
      });
    });

    it("renders streamed event", async () => {
      render(<LiveLogTable />);

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
