
import { CHANGE_FILTER_BRAND, CHANGE_FILTER_CATEGORY, GET_ALL_MOTOS, GET_MOTOS_BY_NAME, GET_MOTO_BY_ID, ORDER_ASC, ORDER_DESC, SET_ACTIVE_SEARCH, ADD_ITEM_TO_CART, DELETE_ITEM_FROM_CART, UPDATE_CART_ITEM_QUANTITY, GET_ORDERS, GET_USER_BY_ID, ADD_ITEM_TO_FAVS, DELETE_ITEM_FROM_FAVS, CHANGE_MAX_PRICE, CHANGE_MIN_PRICE, SET_CURRENT_ORDER } from "./actions";




const initialState = {
    motos: [],
    allMotorcycles: [],
    shoppingCart: [],
    favourites: [],
    filterCategory: [],
    filterBrand: [],
    orderAsc : false,
    orderDesc : false,
    activeSearch: '',
    orders:[],
    user: null,
    minPrice: null,
    maxPrice: null,
    currentOrder: null,
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

        case CHANGE_MIN_PRICE:
            return {
                ...state,
                minPrice: action.payload
            }

        case CHANGE_MAX_PRICE:
            return {
                ...state,
                maxPrice: action.payload
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
                console.log(`shoppingCart${action.payload.userEmail}`);
                localStorage.setItem(`shoppingCart${action.payload.userEmail}`, JSON.stringify([...state.shoppingCart, action.payload]));
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart, action.payload],
                }
            }

        case ADD_ITEM_TO_FAVS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    favourites: [...action.payload]
                }
            } else {
                console.log(`favourites${action.payload.userEmail}`);
                localStorage.setItem(`favourites${action.payload.userEmail}`, JSON.stringify([...state.favourites, action.payload]));
                return {
                    ...state,
                    favourites: [...state.favourites, action.payload],
                }
            }

        case DELETE_ITEM_FROM_CART:
            const itemToRemove = state.shoppingCart.indexOf(action.payload);

            if (itemToRemove > -1) {
                const newState = state.shoppingCart;
                newState.splice(itemToRemove, 1)
                localStorage.setItem(`shoppingCart${action.payload.userEmail}`, JSON.stringify([...newState]));
                return {
                    ...state,
                    shoppingCart: [...newState],
                }
            }

        case DELETE_ITEM_FROM_FAVS:
            const fav = state.favourites.filter(el => el.id === action.payload.id)
            const favsToRemove = state.favourites.indexOf(fav[0]);

            if (favsToRemove > -1) {
                const newState = state.favourites;
                newState.splice(favsToRemove, 1)
                localStorage.setItem(`favourites${action.payload.userEmail}`, JSON.stringify([...newState]));
                return {
                    ...state,
                    favourites: [...newState],
                }
            }

        case UPDATE_CART_ITEM_QUANTITY:
            const cart = state.shoppingCart;
            const index = cart.findIndex(obj => obj.id === action.payload.id && obj.color === action.payload.color);

            if (index > -1) {
                cart[index].quantity = cart[index].quantity + action.payload.quantity;
                localStorage.setItem(`shoppingCart${action.payload.userEmail}`, JSON.stringify([...cart]));

                return {
                    ...state,
                    shoppingCart: [...cart],
                }
            }
            
        case GET_ORDERS:
            return{
                ...state,
                orders: action.payload
            }

        case GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload,
            }

        case SET_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: action.payload,
            }
        
        default:
            return state
    }
}