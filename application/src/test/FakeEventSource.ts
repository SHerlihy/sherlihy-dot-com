import { vi } from 'vitest'

type EventSourceListener = (event: Event) => void
type EventSourceListeners = Record<string, Set<EventSourceListener> | undefined>

export class FakeEventSource {
    static instances: FakeEventSource[] = []

    static readonly CONNECTING = 0
    static readonly OPEN = 1
    static readonly CLOSED = 2

    readonly CONNECTING = FakeEventSource.CONNECTING
    readonly OPEN = FakeEventSource.OPEN
    readonly CLOSED = FakeEventSource.CLOSED

    readonly url: string | URL
    readonly withCredentials: boolean

    readyState = FakeEventSource.CONNECTING

    onopen: ((event: Event) => void) | null = null
    onmessage: ((event: MessageEvent) => void) | null = null
    onerror: ((event: Event) => void) | null = null

    private readonly listeners: EventSourceListeners = Object.create(null)

    constructor(url: string | URL, eventSourceInitDict?: EventSourceInit) {
        this.url = url
        this.withCredentials = eventSourceInitDict?.withCredentials ?? false
        FakeEventSource.instances.push(this)
    }

    addEventListener(type: string, listener: EventSourceListener) {
        const listenersForType = this.listeners[type] ?? new Set<EventSourceListener>()
        listenersForType.add(listener)
        this.listeners[type] = listenersForType
    }

    removeEventListener(type: string, listener: EventSourceListener) {
        this.listeners[type]?.delete(listener)
    }

    close() {
        this.readyState = FakeEventSource.CLOSED
    }

    emitOpen() {
        this.readyState = FakeEventSource.OPEN
        const event = new Event('open')

        this.onopen?.(event)
        this.dispatch('open', event)
    }

    emitMessage(data: unknown, options?: { lastEventId?: string; origin?: string }) {
        const event = this.createMessageEvent('message', data, options)

        this.onmessage?.(event)
        this.dispatch('message', event)
    }

    emitEvent(type: string, data: unknown, options?: { lastEventId?: string; origin?: string }) {
        this.dispatch(type, this.createMessageEvent(type, data, options))
    }

    emitError() {
        const event = new Event('error')

        this.onerror?.(event)
        this.dispatch('error', event)
    }

    listenerCount(type: string) {
        return this.listeners[type]?.size ?? 0
    }

    static reset() {
        FakeEventSource.instances = []
    }

    static install() {
        vi.stubGlobal('EventSource', FakeEventSource)
    }

    static uninstall() {
        vi.unstubAllGlobals()
        FakeEventSource.reset()
    }

    private dispatch(type: string, event: Event) {
        this.listeners[type]?.forEach((listener) => listener(event))
    }

    private createMessageEvent(
        type: string,
        data: unknown,
        options?: { lastEventId?: string; origin?: string },
    ) {
        return new MessageEvent(type, {
            data: typeof data === 'string' ? data : JSON.stringify(data),
            lastEventId: options?.lastEventId,
            origin: options?.origin ?? '',
        })
    }
}
