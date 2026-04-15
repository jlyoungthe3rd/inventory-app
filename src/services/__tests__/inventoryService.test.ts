import { afterEach, beforeAll, expect, test, afterAll, describe } from 'vitest'
import { server } from '../../mocks/server'
import { importItem } from '../itemService'
import type { CompendiumItem } from '../../types/compendium'

describe('Inventory Service', () => {
    beforeAll(async () => {
        //start server
        server.listen()
    })

    afterEach(async () => {
        //reset handlers
        server.resetHandlers()

    })

    afterAll(async () => {
        //close server
        server.close()
    })


    test('it should should successfully import item and return the created item', async () => {
        const fakeItem: CompendiumItem = {
            id: '000',
            name: 'Nothing',
            rarity: 'EPIC',
            equipSlot: "TRINKET",
            stats: {
                hp: 0


            },
            descriptionHtml: "It weighs zero"
        }

        const result = await importItem(fakeItem)
        expect(result).toHaveProperty('name', 'Nothing')
        expect(result).toHaveProperty('id', '000')

    })
})