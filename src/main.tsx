import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import type { MantineColorsTuple } from "@mantine/core";
import { CartProvider } from "./context/CartContext.tsx";

const greenCustom: MantineColorsTuple = [
  "#eafbee",
  "#dbf2e0",
  "#b9e1c2",
  "#94d0a1",
  "#74c186",
  "#60b874",
  "#54b46a",
  "#449e59",
  "#398d4d",
  "#2a7a3f",
];

export const theme = createTheme({
  colors: {
    greenCustom,
  },
  white: "#f3f5fa",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </CartProvider>
  </StrictMode>
);
