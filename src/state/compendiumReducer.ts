
import type { CompendiumAction, CompendiumState } from "../types/compendium";

export const initialState: CompendiumState = {
    items: [],
    isLoading: true,
    error: null,
    searchFilters: {
        search: ''
    }
}

export const compendiumReducer = (
    state: CompendiumState,
    action: CompendiumAction,
): CompendiumState => {
    switch (action.type) {
        case 'FETCH_START': {
            return {
                ...state,
                isLoading: true,
                error: null // good practice to clear errors on new fetches
            }
        }
        case 'FETCH_SUCCESS': {
            return {
                ...state,
                items: action.payload,
                isLoading: false,
            }
        }
        case 'FETCH_ERROR': {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        }
        case 'SET_FILTER': {
            return {
                ...state,
                searchFilters: {
                    ...state.searchFilters,
                    ...action.payload
                }
            }
        }
        default: {
            return state
        }
    }
}