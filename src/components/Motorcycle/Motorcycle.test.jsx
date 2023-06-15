import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import Motorcycle from "./Motorcycle"
import { BrowserRouter } from "react-router-dom"

const mockStore = configureStore()

describe("Motorcycle component", () => {
  test("should render component", () => {
    const initialState = { allMotorcycles: [] }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Motorcycle
            info={{
              id: 1,
              brand: "BMW",
              image: "image.jpg",
              price: 1000,
              model: "1000KR",
              category: "Sport",
              description: "Description",
              year: "2023",
            }}
          />
        </BrowserRouter>
      </Provider>
    )

    const image = screen.getByRole("img")
    const details = screen.getByText(/details/i)
    const price = screen.getByText(/usd/i)

    expect(image).toBeInTheDocument()
    expect(details).toBeInTheDocument()
    expect(price).toBeInTheDocument()
  })

  test("should render component with out of stock message where there are no items left", () => {
    const initialState = {
      allMotorcycles: [
        {
          id: 1,
          items: [{ sold: true }, { sold: true }, { sold: true }],
        },
      ],
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Motorcycle
            info={{
              id: 1,
              brand: "BMW",
              image: "image.jpg",
              price: 1000,
              model: "1000KR",
              category: "Sport",
              description: "Description",
              year: "2023",
            }}
          />
        </BrowserRouter>
      </Provider>
    )

    const outOfStock = screen.queryByText(/item out of stock/i)

    expect(outOfStock).toBeInTheDocument()
  })

  test("should go to details page when clicking on details button", async () => {
    const initialState = { allMotorcycles: [] }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Motorcycle
            info={{
              id: 1,
              brand: "BMW",
              image: "image.jpg",
              price: 1000,
              model: "1000KR",
              category: "Sport",
              description: "Description",
              year: "2023",
            }}
          />
        </BrowserRouter>
      </Provider>
    )

    const details = screen.getByText(/details/i)

    expect(details).toBeInTheDocument()

    await act(() => details.click())

    expect(window.location.pathname).toBe("/1")
  })
})
