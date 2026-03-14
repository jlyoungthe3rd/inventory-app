import type { CompendiumItem } from "../types/compendium"

export const fetchCompendiumItems = async (): Promise<CompendiumItem[]> => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000)) // fake delay for mock data
        const response = await fetch('/compendium.json')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (err) {
        console.error(err)
        throw err
    }
}