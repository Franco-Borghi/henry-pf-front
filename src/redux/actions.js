import axios from "axios"

export const GET_ALL_MOTOS = "GET_ALL_MOTOS"
export const GET_MOTOS_BY_NAME = "GET_MOTOS_BY_NAME"
export const GET_MOTO_BY_ID = "GET_MOTO_BY_ID"
export const CHANGE_FILTER_CATEGORY = "CHANGE_FILTER_CATEGORY"
export const CHANGE_FILTER_BRAND = "CHANGE_FILTER_BRAND"
export const ORDER_ASC = "ORDER_ASC"
export const ORDER_DESC = "ORDER_DESC"

export const fetchData = (dispatch) => {
    axios.get("http://localhost:3001/motorcycles")
    .then(d => dispatch(getAllMotos(d.data)))
    .catch(err => console.log(err))
}

const getAllMotos = (motos) => {
    return {
        type: GET_ALL_MOTOS,
        payload: motos
    }
}

const getMotosByName = (motos) => {
    return{
        type: GET_MOTOS_BY_NAME,
        payload: motos
    }
}

export const fetchDataByName = (dispatch,value) => {
    axios.get(`http://localhost:3001/motorcycles?name=${value}`)
    .then(d => dispatch(getMotosByName(d.data)))
    .catch(err => console.log(err))
}

export const postMotorcycle = async (data) => {
    return await axios.post("http://localhost:3001/motorcycles", data)
}

export const getMotoById = (id) => {
}

export const changeFilterCategory = (category) => {
    return {
        type: CHANGE_FILTER_CATEGORY,
        payload: category
    }
}

export const orderAscending =  (value) => {
return {
        type: ORDER_ASC,
        payload: value
    }
}


export const orderDescending =  (value) => {
    return {
            type: ORDER_DESC,
            payload: value
        }
    }

export const changeFilterBrand = (brand) => {
    return {
        type: CHANGE_FILTER_BRAND,
        payload: brand
    }
}