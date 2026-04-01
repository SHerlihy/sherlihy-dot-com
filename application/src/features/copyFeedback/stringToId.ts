export const stringToId = async (str: string) => {
    const arrUint8 = new TextEncoder().encode(str);
    const arrBuffer = await crypto.subtle.digest('SHA-256', arrUint8)

    const hashArray = Array.from(new Uint8Array(arrBuffer));
    const id = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

    return id
}
