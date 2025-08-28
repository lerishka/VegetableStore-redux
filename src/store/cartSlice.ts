import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { Good } from "../types/good";

export type cartState = {
  goods: Good[];
  cart: Good[];
  quantities: Record<number, number>;
  totalPrice: number;
  status: string;
  error: string | null;
};

const initialState: cartState = {
  goods: [],
  cart: [],
  quantities: {},
  totalPrice: 0,
  status: "",
  error: null,
};

export const fetchGoods = createAsyncThunk<
  Good[],
  void,
  { rejectValue: string }
>("cart/fetchGoods", async function (_, { rejectWithValue }) {
  try {
    const responce = await fetch(
      "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
    );

    if (!responce.ok) {
      throw new Error("Server Error");
    }

    const data: Good[] = await responce.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown Error");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addGood: (
      state,
      action: PayloadAction<{ good: Good; quantity: number }>
    ) => {
      const { good, quantity } = action.payload;
      const { id } = good;

      if (!state.quantities[id]) {
        state.cart.push(good);
        state.quantities[id] = quantity || 1;
      } else {
        state.quantities[id] += 1;
      }

      state.totalPrice = state.cart.reduce(
        (acc, g) => acc + g.price * state.quantities[g.id],
        0
      );
    },

    incrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;

      if (state.quantities[id]) {
        state.quantities[id] += 1;

        const good = state.cart.find((g) => g.id === id);
        if (good) {
          state.totalPrice = state.cart.reduce(
            (acc, g) => acc + g.price * state.quantities[g.id],
            0
          );
        }
      }
    },

    decrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;

      if (!state.quantities[id]) return;

      const good = state.cart.find((g) => g.id === id);
      if (!good) return;

      if (state.quantities[id] > 1) {
        state.quantities[id] -= 1;
        state.totalPrice = state.cart.reduce(
          (acc, g) => acc + g.price * state.quantities[g.id],
          0
        );
      } else {
        delete state.quantities[id];
        state.cart = state.cart.filter((g) => g.id !== id);
        state.totalPrice = state.cart.reduce(
          (acc, g) => acc + g.price * state.quantities[g.id],
          0
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGoods.fulfilled, (state, action: PayloadAction<Good[]>) => {
        state.status = "resolved";
        state.goods = action.payload;
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { addGood, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
