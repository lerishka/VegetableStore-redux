import { render, screen, fireEvent } from "@testing-library/react";
import GoodCard from "./GoodCard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../store/cartSlice";
import type { cartState } from "../../store/cartSlice";
import type { EnhancedStore } from "@reduxjs/toolkit";
import { it, describe, expect, vi, beforeEach } from "vitest";
import { MantineProvider } from "@mantine/core";

const initialCartState: cartState = {
  cart: [],
  goods: [],
  quantities: {},
  totalPrice: 0,
  status: "idle",
  error: null,
};

type TestStore = EnhancedStore<{ cart: cartState }>;

describe("GoodCard component", () => {
  const defaultProps = {
    id: 1,
    fullName: "Carrot - 1 kg",
    price: 10,
    image: "carrot.jpg",
  };

  let testStore: TestStore;

  beforeEach(() => {
    testStore = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: initialCartState },
    });
  });

  it("GoodCard should render correctly", () => {
    render(
      <Provider store={testStore}>
        <MantineProvider>
          <GoodCard {...defaultProps} />
        </MantineProvider>
      </Provider>
    );

    expect(screen.getByText("Carrot")).toBeInTheDocument();
    expect(screen.getByText("1 kg")).toBeInTheDocument();
    expect(screen.getByText("$ 10")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "carrot.jpg");
  });

  it('Should dispatch addGood action when "Add to cart" is clicked', () => {
    render(
      <Provider store={testStore}>
        <MantineProvider>
          <GoodCard {...defaultProps} />
        </MantineProvider>
      </Provider>
    );
    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    const state: cartState = testStore.getState().cart;
    expect(state.cart).toHaveLength(1);

    expect(state.cart[0]).toEqual({
      id: 1,
      name: "Carrot",
      weight: "1 kg",
      price: 10,
      image: "carrot.jpg",
    });

    expect(state.quantities[1]).toBe(1);
    expect(state.totalPrice).toBe(10);
  });
});
