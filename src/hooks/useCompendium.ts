import { useReducer, useState, useEffect, useMemo } from "react";
import { fetchCompendiumItems } from "../services/compendiumService";
import { compendiumReducer } from "../state/compendiumReducer";
import { initialState } from "../state/compendiumReducer";

export const useCompendium = () => {
    const [state, dispatch] = useReducer(compendiumReducer, initialState);
    const [searchText, setSearchText] = useState('');

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

    const filteredItems = useMemo(() => {
        return state.items.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()),
        );
    }, [state.items, searchText]);

    return { filteredItems, searchText, setSearchText, isLoading: state.isLoading, error: state.error, }
}