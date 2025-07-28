import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import GoodCard from "./GoodCard";
import { it, describe, expect, vi, beforeEach } from "vitest";
import { MantineProvider } from "@mantine/core";

const mockAddToCart = vi.fn();

vi.mock("../../context/CartContext", () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    removeFromCart: vi.fn(),
    getQuantityById: vi.fn(() => 0),
  }),
}));

describe("GoodCart component", () => {
  const defaultProps = {
    id: 1,
    fullName: "Carrot - 1 kg",
    price: 10,
    image: "carrot.jpg",
  };

  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  it("GoodCard should render correctly", () => {
    render(
      <MantineProvider>
        <GoodCard {...defaultProps} />
      </MantineProvider>
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

  it('Should calls addToCard when "Add to card" is cliked', async () => {
    render(
      <MantineProvider>
        <GoodCard {...defaultProps} />
      </MantineProvider>
    );
    const button = screen.getByRole("button", { name: /add to cart/i });
    await fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith(
      {
        id: 1,
        name: "Carrot",
        weight: "1 kg",
        price: 10,
        image: "carrot.jpg",
      },
      1
    );
  });
});
