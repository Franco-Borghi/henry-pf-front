import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { postMotorcycle, fetchData, getAllMotos } from './actions';

let mockAxios;

beforeEach(() => {
    mockAxios = new MockAdapter(axios);
});

afterEach(() => {
    mockAxios.reset();
});

test('fetchData makes successful axios call and dispatches getAllMotos with data from API', async () => {
    // Mock data
    const data = [{
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
    }];

    // Mock dispatch function
    const dispatch = jest.fn();

    // Mock API response
    // mockAxios.onGet(`${process.env.REACT_APP_HOST_NAME}/motorcycles`).reply(200, data);
    mockAxios.onGet(`${process.env.REACT_APP_HOST_NAME}/motorcycles`).reply(() => {
        console.log("Mocked axios get request triggered");
        return [200, data];
      });

    // Call fetchData with the mocked dispatch function
    await fetchData(dispatch);
  
    // Check that GET request was made to the correct URL
    expect(mockAxios.history.get[0].url).toBe(`${process.env.REACT_APP_HOST_NAME}/motorcycles`);

    // Mock action object
    const action = getAllMotos(data);

    // Verify dispatch was called with the correct data
    expect(dispatch).toHaveBeenCalledWith(action);
});

test('postMotorcycle posts data to API and returns the same data', async () => {
    // Mock data
    const data = [{
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
    }];

  // Mock API response
  mockAxios.onPost(`${process.env.REACT_APP_HOST_NAME}/motorcycles`).reply(201, data);

  // Call postMotorcycle with the mocked data
  const response = await postMotorcycle(data);

  // Verify the response matches the posted data
  expect(response.data).toEqual(data);
});

