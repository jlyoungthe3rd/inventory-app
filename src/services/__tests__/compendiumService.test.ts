import { expect, test, assert, describe } from 'vitest'
import { fetchCompendiumItems } from '../compendiumService'
import { server } from '../../mocks/server'
import { HttpResponse, http } from 'msw'

describe('Compendium Service', () => {
    test('it should return an array of CompendiumItems on success', async () => {
        const data = await fetchCompendiumItems()
        assert.isArray(data)
        expect(data[0]).toHaveProperty('name')
    })

    test('it should throw an error when the server returns a 500', async () => {
        server.use(
            http.get('/api/compendium/base', () => {
                return new HttpResponse(null, { status: 500 })
            }
            ))

        await expect(fetchCompendiumItems()).rejects.toThrow(Error)
    })

    test('it should throw an error on network failure', async () => {
        server.use(
            http.get('/api/compendium/base', () => {
                return HttpResponse.error()
            }
            ))

        await expect(fetchCompendiumItems()).rejects.toThrow(Error)
    })

    test('it should through an error if base succeeds but DLC returns a 500', async () => {
        server.use(http.get('/api/compendium/dlc', () => {
            return new HttpResponse(null, { status: 500 })
        }))

        await expect(fetchCompendiumItems()).rejects.toThrow(Error)
    })
})