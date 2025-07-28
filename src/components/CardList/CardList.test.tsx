import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardList from "./CardList";
import { CartProvider } from "../../context/CartContext";

describe("CardList component", () => {
  it('After the render there should has the role "list"', async () => {
    render(
      <CartProvider>
        <CardList />
      </CartProvider>
    );
    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
  });
});
