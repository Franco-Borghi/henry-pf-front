import NavBar from "./NavBar"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import { Provider } from "react-redux"
import store from "../../redux/store"
import { BrowserRouter } from 'react-router-dom';

describe("NavBar", () => {
  test("renders NavBar component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    )
    const home = screen.getByText(/home/i)
    expect(home).toBeInTheDocument()
  })

  test("Log out / in button should be displayed", () => {

    // To be refactored...
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    )
    const logOutInBtn = screen.getByLabelText('logout/in');
    expect(logOutInBtn).toBeInTheDocument()
  })
})