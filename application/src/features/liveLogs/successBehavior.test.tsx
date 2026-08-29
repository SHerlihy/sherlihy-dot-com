// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import userEvent from '@testing-library/user-event';

import { FakeEventSource } from "../../test/FakeEventSource"
import LiveLogTable, { type LiveLog } from "./LiveLogTable"
import { createLiveLogStream } from "./LiveLogStream"

import {columnTitles, CloudFrontLogEvent} from "./definitions.ts"

describe("LiveLogs", () => {
    beforeEach(() => {
        FakeEventSource.install()
    })

    afterEach(() => {
        cleanup()
        FakeEventSource.uninstall()
    })

    describe("component layout", ()=>{

        columnTitles.forEach((title)=>{
            it("initialises with ${title} field", ()=>{
                const { rerender } = render(<LiveLogTable />)

                const titleElements = screen.getAllByText(title)
                expect(
                    titleElements.some((el)=>el.tagName === 'TH')
                ).toBe(true)
            })
        })

        columnTitles.forEach((title)=>{
            it("removes field with ${title}", async ()=>{
                const user = userEvent.setup();

                render(<LiveLogTable />)

                let titleElements = screen.getAllByText(title)
                const titleButton = titleElements.find((el)=>el.tagName==='BUTTON')
                if(titleButton === undefined){
                    throw new Error(`Button with text '${title}' not found.`)
                }

                await user.click(titleButton)

                titleElements = screen.getAllByText(title)
                expect(
                    titleElements.some((el)=>el.tagName === 'TH')
                ).toBe(false)
            })
        })
    })

    it("adds streamed log data to the rendered table", () => {
        render(<LiveLogTable/>)

        FakeEventSource.instances[0].emitMessage({
            timestamp: "2026-08-28T16:00:01.000Z",
            level: "error",
            source: "worker",
            message: "Failed to process import",
        })

        rerender(<LiveLogTable logs={logs} />)

        const table = screen.getByRole("table", { name: "Live logs" })
        const rows = within(table).getAllByRole("row")

        expect(rows).toHaveLength(3)
        expect(
            within(table).getByRole("row", { name: /info api log stream connected/i }),
        ).toBeDefined()
        expect(
            within(table).getByRole("row", { name: /error worker failed to process import/i }),
        ).toBeDefined()
    })
})
