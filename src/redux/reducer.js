import { CHANGE_FILTER_BRAND, CHANGE_FILTER_CATEGORY, GET_ALL_MOTOS, GET_MOTOS_BY_NAME, GET_MOTO_BY_ID } from "./actions";

const initialState = {
    motos: [],
    filterCategory: [],
    filterBrand: [],
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_ALL_MOTOS:
            return {
                ...state,
            }

        case GET_MOTOS_BY_NAME:
            return {
                ...state,
               
            }

        case GET_MOTO_BY_ID:
            return {
                ...state,
            }

        case CHANGE_FILTER_CATEGORY:
            if(state.filterCategory.includes(action.payload)){
            return {
                ...state,
                filterCategory: [...state.filterCategory.filter(c => c !== action.payload)]
            }}
            else{
                return {
                    ...state,
                    filterCategory: [...state.filterCategory.concat(action.payload)]
                }
            }

        case CHANGE_FILTER_BRAND:
            if(state.filterBrand.includes(action.payload)){
            return {
                ...state,
                filterBrand: [...state.filterBrand.filter(b => b !== action.payload)]
            }}
            else{
                return {
                    ...state,
                    filterBrand: [...state.filterBrand.concat(action.payload)]
                }
            }
        default:
            return state
    }
}