// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import userEvent from '@testing-library/user-event';

import { FakeEventSource } from "../../test/FakeEventSource"
import LiveLogTable from "./LiveLogTable"

import {
methods,
edgeResultTypes,
sslProtocols,
userProtocols,
userProtocolVersion,
columnTitles,
    CloudFrontLogEvent,
    LogEntryEvent,
    CloudFrontLogPayload,
    DisplayLogEvent
} from "./definitions.ts"

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

        function createDummyLogData():CloudFrontLogPayload{
            return {
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
        }

        let dummyEventObjects: Array<CloudFrontLogEvent> = []

        beforeEach(() => {
            for (let i = 0; i < 3; i++){
                const dummyAccessLog = createDummyLogData()

                const dummyLogEntryEvent: LogEntryEvent = {
                    id: `Event-${i}`,
                    event: 'log_entry',
                    data: dummyAccessLog

                }

                dummyEventObjects.push(dummyLogEntryEvent)
            }

            dummyEventObjects.forEach((dummyEvent)=>{
                FakeEventSource.instances[0].emitMessage(dummyEvent)
            })
        })

        afterEach(() => {
            dummyEventObjects = []
        })


        dummyEventObjects.forEach((dummyEvent, i)=>{
            if(dummyEvent.id === undefined){
                throw new Error(`Dummy data missing id at index ${i}`)
            }

            it(`renders event ${dummyEvent.id}`, ()=>{

                render(<LiveLogTable />)

                screen.getByText(dummyEvent.id!)
            })
        })

        it('renders streamed event', async ()=>{
            render(<LiveLogTable />)

            const streamedEventId = "streamedEventId"
            const freshLogData = createDummyLogData()

            const dummyLogEntryEvent: LogEntryEvent = {
                id: streamedEventId,
                event: 'log_entry',
                data: freshLogData
            }

            const idElementPreEmit = screen.queryByText(streamedEventId)
            expect(idElementPreEmit).toBeNull()

            FakeEventSource.instances[0].emitMessage(dummyLogEntryEvent)

            const idElement = await screen.findByText(streamedEventId)
            expect(idElement).not.toBeNull()
        })
    })
})
