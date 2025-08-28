import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardList from "./CardList";

describe("CardList component", () => {
  it('After the render there should has the role "list"', async () => {
    render(<CardList />);
    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
  });
});
