import { expect, test, describe } from 'vitest'
import { importItem } from '../itemService'
import type { CompendiumItem } from '../../types/compendium'

describe('Inventory Service', () => {
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