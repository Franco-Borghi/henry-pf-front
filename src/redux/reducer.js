import { CHANGE_FILTER_BRAND, CHANGE_FILTER_CATEGORY, GET_ALL_MOTOS, GET_MOTOS_BY_NAME, GET_MOTO_BY_ID, ORDER_ASC, ORDER_DESC, SET_ACTIVE_SEARCH } from "./actions";

const initialState = {
    motos: [],
    filterCategory: [],
    filterBrand: [],
    orderAsc : false,
    orderDesc : false,
    activeSearch: '',
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_ALL_MOTOS:
            return {
                ...state,
                motos: [...action.payload]
            }

        case GET_MOTOS_BY_NAME:
            return {
                ...state,
                motos: [...action.payload]
            }

        case GET_MOTO_BY_ID:
            return {
                ...state,
            }

        case SET_ACTIVE_SEARCH:
            return {
                ...state,
                activeSearch: action.payload
            }

        case ORDER_ASC:
            return {
                ...state,
                orderAsc: action.payload,
                orderDesc : false,
            }
        
        case ORDER_DESC:
            return {
                ...state,
                orderAsc: false,
                orderDesc : action.payload,
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