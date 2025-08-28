import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { describe, it, expect } from "vitest";
import Catalog from "./Catalog";

describe("Catalog component", () => {
  it('After the render there should be the word "Catalog"', () => {
    render(
      <Provider store={store}>
        <Catalog />
      </Provider>
    );
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
