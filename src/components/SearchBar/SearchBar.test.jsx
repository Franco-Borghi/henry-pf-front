import React from "react"
import SearchBar from "./SearchBar"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../../redux/store"
import userEvent from "@testing-library/user-event"

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


describe("SearchBar", () => {
  test("renders SearchBar component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchBar />
        </BrowserRouter>
      </Provider>
    )

    const input = screen.getByPlaceholderText(/search/i)
    expect(input).toBeInTheDocument()
  })

  test("Should navigate to home when click on search button", () => {

    const inputRef = React.createRef();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchBar searchInput={inputRef}/>
        </BrowserRouter>
      </Provider>
    )

    const input = screen.getByPlaceholderText(/search/i)
    const button = screen.getByRole("button")

    userEvent.type(input, "honda")
    userEvent.click(button)

    expect(input.value).toBe("honda")
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
