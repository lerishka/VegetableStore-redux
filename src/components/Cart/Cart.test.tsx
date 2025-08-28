import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { describe, it, expect } from "vitest";
import Card from "./Cart";

describe("Card component", () => {
  it("After the render there shouldn't be in the document", async () => {
    render(
      <Provider store={store}>
        <Card />
      </Provider>
    );
    expect(screen.queryByTestId("cart")).toBeNull();
  });
});
