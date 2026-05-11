import { useReducer, useEffect, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";
import { fetchCompendiumItems } from "../services/compendiumService";
import { compendiumReducer } from "../state/compendiumReducer";
import { initialState } from "../state/compendiumReducer";
import { useSessionStorage } from "./useSessionStorage";

export type SortKey = 'id' | 'hp' | 'mp' | 'str' | 'dex' | 'int'
export type SortDirection = 'asc' | 'desc'

export interface SortState {
    key: SortKey
    direction: SortDirection
}

export const useCompendium = () => {
    const [state, dispatch] = useReducer(compendiumReducer, initialState);
    const [searchText, setSearchText] = useSessionStorage('compendium_search', '');
    const [sortState, setSortState] = useState<SortState>({ key: 'id', direction: 'asc' })

    const handleSortChange = (newKey: SortKey) => {
        if (sortState.key === newKey) {
            setSortState({ key: newKey, direction: sortState.direction === 'asc' ? 'desc' : 'asc' })
        } else {
            setSortState({ key: newKey, direction: 'desc' })
        }
    }

    useEffect(() => {
        const loadWrapper = async () => {
            dispatch({ type: 'FETCH_START' }); // Start loading

            try {
                const data = await fetchCompendiumItems();
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error: unknown) {
                let errorMessage = 'An unknown error occured';

                if (error instanceof Error) {
                    errorMessage = error.message;
                } else if (typeof error === 'string') {
                    errorMessage = error;
                }
                dispatch({
                    type: 'FETCH_ERROR',
                    payload: errorMessage || 'Unknown Error',
                });
            }
        };

        loadWrapper();
    }, []);

    const debounceSearchText = useDebounce(searchText, 300)

    const filteredItems = useMemo(() => {
        let items = state.items.filter((item) =>
            item.name.toLowerCase().includes(debounceSearchText.toLowerCase()),
        );

        const { key, direction } = sortState;

        items = items.sort((a, b) => {
            const valA = key === 'id' ? parseInt(a.id) : (a.stats[key as keyof typeof a.stats] ?? 0);
            const valB = key === 'id' ? parseInt(b.id) : (b.stats[key as keyof typeof b.stats] ?? 0);

            return direction === 'asc' ? valA - valB : valB - valA;
        });

        return items;

    }, [state.items, debounceSearchText, sortState]);

    return { filteredItems, searchText, setSearchText, isLoading: state.isLoading, error: state.error, handleSortChange, sortState }
}