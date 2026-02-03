import { useRef, useEffect } from "react";
import type { InventoryAction, InventoryState } from "../types";

export const usePersistence = (
    state: InventoryState,
    dispatch: React.Dispatch<InventoryAction>
) => {

    const timeoutRef = useRef<number | null>(null)

    useEffect(() => {


        // 1. clear any pending saves(debounce logic)
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
        }

        // 2. set a new timer
        timeoutRef.current = window.setTimeout(() => {
            // 3. seralize data we need for localstorage
            const dataToSave = {
                bag: state.bag,
                equipped: state.equipped
            }
            window.localStorage.setItem('inventory_data', JSON.stringify(dataToSave))
        }, 500)

        // perform clean up
        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current)
            }
        }
    }, [state.bag, state.equipped])
}