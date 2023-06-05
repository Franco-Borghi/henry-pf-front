import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { postMotorcycle, fetchData, getAllMotos, fetchDataByName, getMotosByName, setActiveSearch, getOrders, GET_ORDERS, getUserById, GET_USER_BY_ID } from './actions';

let mockAxios;

beforeEach(() => {
    mockAxios = new MockAdapter(axios);
});

afterEach(() => {
    mockAxios.reset();
});

const motorcycles = [{
    chassisId: "13443-123-B45-267-50",
    brand: "BMW",
    category: "Work",
    model: "FENIX",
    year: 2023,
    price: 25900,
    cc: 150,
    color: "Blue",
    transmission: "Manual",
    image: "https://www.dinamotos.mx/wp-content/uploads/2021/09/1AUX-8.png",
    description: "Maximum Speed: 80 KM/H\nFuel Efficiency: 28 KM/L\nEngine Type: SINGLE CYLINDER, 4-STROKE\nMaximum Power: 10.5 H.P.\nStart: ELECTRIC AND KICK\nFuel Capacity: 10 LITERS\n"
}]


test('fetchData makes successful axios call and dispatches getAllMotos with data from API', async () => {

    const dispatch = jest.fn();

    mockAxios.onGet(`${process.env.REACT_APP_HOST_NAME}/motorcycles`).reply(200, motorcycles);

    await fetchData(dispatch);

    expect(mockAxios.history.get[0].url).toBe(`${process.env.REACT_APP_HOST_NAME}/motorcycles`);

    const action = getAllMotos(motorcycles);

    expect(dispatch).toHaveBeenCalledWith(action);
});

test('fetchDataByName makes successful axios call and dispatches getMotosByName and setActiveSearch with data from API', async () => {

    const searchValue = "FENIX";

    const dispatch = jest.fn();

    mockAxios.onGet(`${process.env.REACT_APP_HOST_NAME}/motorcycles?name=${searchValue}`).reply(200, motorcycles[0]);

    await fetchDataByName(dispatch, searchValue);

    expect(mockAxios.history.get[0].url).toBe(`${process.env.REACT_APP_HOST_NAME}/motorcycles?name=${searchValue}`);

    const actionGetMotosByName = getMotosByName(motorcycles[0]);
    const actionSetActiveSearch = setActiveSearch(searchValue);

    expect(dispatch).toHaveBeenCalledWith(actionGetMotosByName);
    expect(dispatch).toHaveBeenCalledWith(actionSetActiveSearch);
});

test('postMotorcycle posts data to API and returns the same data', async () => {

    mockAxios.onPost(`${process.env.REACT_APP_HOST_NAME}/motorcycles`).reply(201, motorcycles[0]);

    const response = await postMotorcycle(motorcycles[0]);
  
    expect(response.data).toEqual(motorcycles[0]);
});

test('postMotorcycle fails when incomplete data is sent', async () => {

    const incompleteData = [{
        brand: "BMW",
        category: "Work",
        model: "FENIX",
        year: 2023,
        cc: 150,
    }];

    mockAxios.onPost(`${process.env.REACT_APP_HOST_NAME}/motorcycles`, incompleteData).reply(404);

    try {
        await postMotorcycle(incompleteData);
    } catch (error) {
        expect(error.response.status).toEqual(404);
    }
});

const orders = [{
    orderNumber: 1,
    date: "2021-10-01",
    amountPaid: 25900,
    orderStatus: "Paid",
    userId: "123456789",
    items: [{
        id: "67de5dc4-a7ac-4446-bc97-72ba3bce0d2a",
        color: "Black"
    }]
},
{
    orderNumber: 2,
    date: "2021-10-02",
    amountPaid: 35900,
    orderStatus: "Paid",
    userId: "123456789",
    items: [{
        id: "e449df4f-e903-4930-88e2-69a628df7084",
        color: "Red"
    }]
}
];

test('getOrders makes successful axios call and dispatches GET_ORDERS action', async () => {

    const dispatch = jest.fn();

    mockAxios.onGet(`${process.env.REACT_APP_HOST_NAME}/orders`).reply(200, orders);

    await getOrders()(dispatch);
  
    expect(mockAxios.history.get[0].url).toBe(`${process.env.REACT_APP_HOST_NAME}/orders`);

    expect(dispatch).toHaveBeenCalledWith({
        type: GET_ORDERS,
        payload: orders
    });
});

const user = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '1234567890',
    idNumber: 123456789,
    active: true,
    role: 'client'
};

test('getUserById makes successful axios call and dispatches GET_USER_BY_ID action', async () => {

    const dispatch = jest.fn();

    mockAxios.onGet(`${process.env.REACT_APP_HOST_NAME}/users/${user.id}`).reply(200, user);

    await getUserById(user.id)(dispatch);

    expect(mockAxios.history.get[0].url).toBe(`${process.env.REACT_APP_HOST_NAME}/users/${user.id}`);

    expect(dispatch).toHaveBeenCalledWith({
        type: GET_USER_BY_ID,
        payload: user,
    });
});

test('getUserById dispatches GET_USER_BY_ID action with null when id is not provided', async () => {

    const dispatch = jest.fn();

    await getUserById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
        type: GET_USER_BY_ID,
        payload: null,
    });
});



