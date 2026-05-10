import { describe, it, expect } from 'vitest'
import { catchError } from './async'

describe('catchError', () => {
    it('should return [undefined, data] when the promise resolves', async () => {
        const promise = Promise.resolve('success')
        const [error, data] = await catchError(promise)

        expect(error).toBeUndefined()
        expect(data).toBe('success')
    })

    it('should return [error] when the promise rejects', async () => {
        const testError = new Error('failure')
        const promise = Promise.reject(testError)
        const [error, data] = await catchError(promise)

        expect(error).toBe(testError)
        expect(data).toBeUndefined()
    })
})
