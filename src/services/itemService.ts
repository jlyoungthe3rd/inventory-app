import type { CompendiumItem } from "../types/compendium"
import type { Item } from "../types/item"

export const fetchInitialBag = async (): Promise<Item[]> => {

    try {
        const response = await fetch('/items.json')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const importItem = async (item: CompendiumItem): Promise<Item> => {

    try {
        const response = await fetch('/api/inventory/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (err) {
        console.error(err)
        throw err
    }

}