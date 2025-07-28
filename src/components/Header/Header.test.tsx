import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Header from "./Header";
import { CartProvider } from "../../context/CartContext";
import { MantineProvider } from "@mantine/core";

describe("CardList component", () => {
  it('After the render there should has the role "list"', async () => {
    render(
      <CartProvider>
        <MantineProvider>
          <Header />
        </MantineProvider>
      </CartProvider>
    );
    const button = await screen.findByRole("button");
    await userEvent.click(button);
    expect(
      await screen.findByTestId("cart-region-in-header")
    ).toBeInTheDocument();
  });
});
