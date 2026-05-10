/**
 * Splits a string into an array based on newline characters or their string representations.
 */
export function stringToArray(input: string): string[] {
    const delimiters = [
        '\n',
        '\r',
        '\\n',
        '\\r',
        '0x0A',
        'U+000A',
        '0x0D',
        'U+000D'
    ]
    
    // Create a regex that matches one or more of any of the delimiters
    const regex = new RegExp(`(?:${delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})+`, 'g')
    
    return input.split(regex)
}
