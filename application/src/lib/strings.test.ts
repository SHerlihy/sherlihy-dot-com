import { describe, it, expect } from 'vitest'
import { stringLineBreaksToBreakLine } from './strings'

const line_feed_chars = [
    '\n',
    '\\n',
    '0x0A',
    'U+000A'
]

const carriage_return_chars = [
    '\r',
    '\\r',
    '0x0D',
    'U+000D',
]

const new_line_chars = [
    ...line_feed_chars,
    ...carriage_return_chars
]

describe('stringLineBreaksToBreakLine', () => {
    new_line_chars.forEach((char) => {
        it(`should replace ${char} character`, () => {
            const input = `Some text.${char}Other text.`
            const expected = `Some text.\n\nOther text.`

            const output = stringLineBreaksToBreakLine(input)

            expect(output).toEqual(expected)
        })
    })

    new_line_chars.forEach((charA) => {
        new_line_chars.forEach((charB) => {
        it(`should replace ${charA}${charB} character`, () => {
                const input = `Some text.${charA}${charB}Other text.`
                const expected = `Some text.\n\nOther text.`

                const output = stringLineBreaksToBreakLine(input)

                expect(output).toEqual(expected)
            })
        })
    })
})
