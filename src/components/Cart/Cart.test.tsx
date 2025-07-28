import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./Cart";
import { CartProvider } from "../../context/CartContext";

describe("Card component", () => {
  it("After the render there shouldn't be in the document", async () => {
    render(
      <CartProvider>
        <Card />
      </CartProvider>
    );
    expect(screen.queryByTestId("cart")).toBeNull();
  });
});
