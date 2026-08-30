// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import userEvent from '@testing-library/user-event';

import { FakeEventSource } from "../../test/FakeEventSource"
import LiveLogTable, { type LiveLog } from "./LiveLogTable"

import {columnTitles, CloudFrontLogEvent, LogEntryEvent} from "./definitions.ts"

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
                render(<LiveLogTable />)

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

    describe("stream behaviour", ()=>{
        const methods = ['GET' , 'POST' , 'PUT' , 'DELETE' , 'OPTIONS' , 'HEAD' , 'PATCH'] as const
        const edgeResultTypes = ['Hit' , 'Miss' , 'RefreshHit' , 'Redirect' , 'Error' , 'LimitExceeded' , 'CapacityExceeded'] as const
        const sslProtocols = ['TLSv1.2' , 'TLSv1.3' , '-'] as const
        const userProtocols = ['http' , 'https' , 'ws' , 'wss'] as const
        const userProtocolVersion = ['HTTP/1.0' , 'HTTP/1.1' , 'HTTP/2' , 'HTTP/3'] as const

        let dummyEventObjects: Array<CloudFrontLogEvent> = []

        beforeEach(() => {
            for (let i = 0; i < 99; i++){
                const dummyAccessLog = {
                    timestamp: Math.random(),
                    time_taken: Math.random(),
                    sc_status: 200,
                    ctx_host: "host",
                    cs_method: methods[Math.floor(Math.random()*methods.length)],
                    cs_uri_stem: "something/otherthing/endpoint",
                    cs_uri_query: "uri query",
                    x_edge_result_type: edgeResultTypes[Math.floor(Math.random()*methods.length)],
                    x_edge_request_id: "edgeId",
                    ssl_protocol: sslProtocols[Math.floor(Math.random()*methods.length)],
                    ssl_cipher: "sslCipher",
                    x_edge_response_result_type: edgeResultTypes[Math.floor(Math.random()*methods.length)],
                    cs_user_agent: "user agent",
                    cs_referer: "user referer",
                    cs_cookie: "cookie data",
                    sc_bytes: 99999,
                    cs_bytes: 99999,
                    x_edge_location: "edge location",
                    sc_content_len: 999,
                    time_to_first_byte: 9999,
                    cs_host_header: "user header",
                    cs_protocol: userProtocols[Math.floor(Math.random()*methods.length)],
                    cs_protocol_version: userProtocolVersion[Math.floor(Math.random()*methods.length)],
                    fle_status: "fle status",
                    fle_encrypted_fields: 99
                }

                const dummyLogEntryEvent: LogEntryEvent = {
                    id: `Event-${i}`,
                    event: 'log_entry',
                    data: dummyAccessLog

                }

                dummyEventObjects.push(dummyLogEntryEvent)
            }
        })

        afterEach(() => {
            dummyEventObjects = []
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
