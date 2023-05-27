import { CHANGE_FILTER_BRAND, CHANGE_FILTER_CATEGORY, GET_ALL_MOTOS, GET_MOTOS_BY_NAME, GET_MOTO_BY_ID, ORDER_ASC, ORDER_DESC, SET_ACTIVE_SEARCH, ADD_ITEM_TO_CHART, DELETE_ITEM_FROM_CHART, UPDATE_CHART_ITEM_QUANTITY } from "./actions";

const initialState = {
    motos: [],
    allMotorcycles: [],
    shoppingChart: [],
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
                motos: [...action.payload],
                allMotorcycles: [...action.payload]
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

        case ADD_ITEM_TO_CHART:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    shoppingChart: [...action.payload]
                }
            } else {
                console.log(`shoppingChart${action.payload.userId}`);
                localStorage.setItem(`shoppingChart${action.payload.userId}`, JSON.stringify([...state.shoppingChart, action.payload]));
                return {
                    ...state,
                    shoppingChart: [...state.shoppingChart, action.payload],
                }
            }
            

        case DELETE_ITEM_FROM_CHART:
            const itemToRemove = state.shoppingChart.indexOf(action.payload);

            if (itemToRemove > -1) {
                const newState = state.shoppingChart;
                newState.splice(itemToRemove, 1)
                localStorage.setItem(`shoppingChart${action.payload.userId}`, JSON.stringify([...newState]));
                return {
                    ...state,
                    shoppingChart: [...newState],
                }
            }

        case UPDATE_CHART_ITEM_QUANTITY:
            const chart = state.shoppingChart;
            const index = chart.findIndex(obj => obj.id === action.payload.id);

            if (index > -1) {
                chart[index].quantity = chart[index].quantity + action.payload.quantity;
                localStorage.setItem(`shoppingChart${action.payload.userId}`, JSON.stringify([...chart]));

                return {
                    ...state,
                    shoppingChart: [...chart],
                }
            }

        default:
            return state
    }
}