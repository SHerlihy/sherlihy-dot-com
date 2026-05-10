import { describe, it, expect } from 'vitest'
import { stringToArray } from './strings'

const line_feed_chars = [
    '\n',
    '0x0A',
    'U+000A'
]

const carriage_return_chars = [
    '\r',
    '0x0D',
    'U+000D',
]

const new_line_chars = [
    ...line_feed_chars,
    ...carriage_return_chars
]

describe('stringToArray', () => {
    new_line_chars.forEach((char) => {
        it(`should split string with ${char} character`, () => {
            const input = `Some text.${char}Other text.`
            const output = stringToArray(input)

            expect(output.length === 2)
        })
    })

    new_line_chars.forEach((charA) => {
        new_line_chars.forEach((charB) => {
            it(`should split string with doubled ${charA} ${charB} characters`, () => {
                const input = `Some text.${charA}${charB}Other text.`
                const output = stringToArray(input)

                expect(output.length === 2)
            })
        })
    })
})
