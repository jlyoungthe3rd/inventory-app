import type { Item } from "../types"

export const fetchInitialBag = async (): Promise<Item[]> => {

    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
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