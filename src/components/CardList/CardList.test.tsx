import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { describe, it, expect } from "vitest";
import CardList from "./CardList";

describe("CardList component", () => {
  it('After the render there should has the role "list"', async () => {
    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );
    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
  });
});
