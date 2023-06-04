import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore } from 'redux';
import { Checkout } from './Checkout';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';


const mockStore = createStore(() => ({
    shoppingCart: [{
        id: 1,
        unitPrice: 100,
        quantity: 1,
        color: "red",
    }],
    allMotorcycles: [{
        id: 1,
        brand: "Test Brand",
        model: "Test Model",
    }],
}));

describe('Render of Component', () => {
    it('renders correctly', () => {
        render(
            <Provider store={mockStore}>
                <Router>
                    <Checkout />
                </Router>
            </Provider>
        );

        const unitPrice = screen.getByText(/Unit Price/i);
        const quantity = screen.getByText(/Quantity/i);
        const subTotal = screen.getByText(/Item subtotal/i);
        expect(unitPrice).toBeInTheDocument();
        expect(quantity).toBeInTheDocument();
        expect(subTotal).toBeInTheDocument();
    });
});

describe('Return Home functionality', () => {

    it('navigates to home page on button click', () => {
        const history = createMemoryHistory();

        render(
            <Provider store={mockStore}>
                <Router history={history}>
                    <Checkout />
                </Router>
            </Provider>
        );

        const button = screen.getByText(/Continue shopping/i);
        userEvent.click(button);
        expect(history.location.pathname).toBe('/');
    });
})

