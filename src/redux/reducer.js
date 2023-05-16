import { GET_ALL_MOTOS, GET_MOTOS_BY_NAME, GET_MOTO_BY_ID } from "./actions";

const initialState = {
    motos: [],
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

        default:
            return state
    }
}