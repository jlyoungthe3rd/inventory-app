import { useState, useEffect } from "react"

export function useSessionStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.sessionStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.warn(`Error reading sessonStroage key ${key}, error`)
            return initialValue
        }
    })

    useEffect(() => { window.sessionStorage.setItem(key, JSON.stringify(storedValue)) }, [key, storedValue])


    return [storedValue, setStoredValue] as const
}