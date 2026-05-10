import { useReducer, useEffect, useMemo } from "react";
import { useDebounce } from "./useDebounce";
import { fetchCompendiumItems } from "../services/compendiumService";
import { compendiumReducer } from "../state/compendiumReducer";
import { initialState } from "../state/compendiumReducer";
import { useSessionStorage } from "./useSessionStorage";

export const useCompendium = () => {
    const [state, dispatch] = useReducer(compendiumReducer, initialState);
    const [searchText, setSearchText] = useSessionStorage('compendium_search', '');

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
        return state.items.filter((item) =>
            item.name.toLowerCase().includes(debounceSearchText.toLowerCase()),
        );
    }, [state.items, debounceSearchText]);

    return { filteredItems, searchText, setSearchText, isLoading: state.isLoading, error: state.error, }
}