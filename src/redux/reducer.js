import { CHANGE_FILTER_BRAND, CHANGE_FILTER_CATEGORY, GET_ALL_MOTOS, GET_MOTOS_BY_NAME, GET_MOTO_BY_ID, ORDER_ASC, ORDER_DESC, SET_ACTIVE_SEARCH, ADD_ITEM_TO_CART, DELETE_ITEM_FROM_CART, UPDATE_CART_ITEM_QUANTITY } from "./actions";

const initialState = {
    motos: [],
    allMotorcycles: [],
    shoppingCart: [],
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

        case ADD_ITEM_TO_CART:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    shoppingCart: [...action.payload]
                }
            } else {
                console.log(`shoppingCart${action.payload.userId}`);
                localStorage.setItem(`shoppingCart${action.payload.userId}`, JSON.stringify([...state.shoppingCart, action.payload]));
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart, action.payload],
                }
            }
            

        case DELETE_ITEM_FROM_CART:
            const itemToRemove = state.shoppingCart.indexOf(action.payload);

            if (itemToRemove > -1) {
                const newState = state.shoppingCart;
                newState.splice(itemToRemove, 1)
                localStorage.setItem(`shoppingCart${action.payload.userId}`, JSON.stringify([...newState]));
                return {
                    ...state,
                    shoppingCart: [...newState],
                }
            }

        case UPDATE_CART_ITEM_QUANTITY:
            const cart = state.shoppingCart;
            const index = cart.findIndex(obj => obj.id === action.payload.id);

            if (index > -1) {
                cart[index].quantity = cart[index].quantity + action.payload.quantity;
                localStorage.setItem(`shoppingCart${action.payload.userId}`, JSON.stringify([...cart]));

                return {
                    ...state,
                    shoppingCart: [...cart],
                }
            }

        default:
            return state
    }
}