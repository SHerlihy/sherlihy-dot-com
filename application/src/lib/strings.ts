/**
 * Splits a string into an array based on newline characters or their string representations.
 */
export function stringToArray(input: string): string[] {
    // Escape special regex characters if any of these could be interpreted as such, 
    // though these specific ones are safe.
    const delimiters = [
        '\n',
        '\r',
        '0x0A',
        'U+000A',
        '0x0D',
        'U+000D'
    ]
    
    // Create a regex that matches any of the delimiters
    // Using a non-capturing group for the OR branches
    const regex = new RegExp(delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
    
    return input.split(regex)
}
