import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./Cart";

describe("Card component", () => {
  it("After the render there shouldn't be in the document", async () => {
    render(<Card />);
    expect(screen.queryByTestId("cart")).toBeNull();
  });
});
