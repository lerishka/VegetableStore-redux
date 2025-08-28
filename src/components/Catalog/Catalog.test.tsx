import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Catalog from "./Catalog";

describe("Catalog component", () => {
  it('After the render there should be the word "Catalog"', () => {
    render(<Catalog />);
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
