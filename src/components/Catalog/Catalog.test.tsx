import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Catalog from "./Catalog";
import { CartProvider } from "../../context/CartContext";

describe("Catalog component", () => {
  it('After the render there should be the word "Catalog"', () => {
    render(
      <CartProvider>
        <Catalog />
      </CartProvider>
    );
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
