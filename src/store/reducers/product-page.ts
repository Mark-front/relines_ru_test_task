import {createReducer, createSlice} from '@reduxjs/toolkit';
import { LinkedProduct, Product } from '../../models';
import {fetchProduct} from "../actions/product-page";

type CatalogPageState = {
  product: Product | undefined;
  linkedProducts: LinkedProduct[] | undefined;
  comparingProducts: Product[] | undefined;
};

const defaultState: CatalogPageState = {
  product: undefined,
  linkedProducts: undefined,
  comparingProducts: undefined,
};

export const productPageSlice = createSlice({
  name: 'product-page',
  initialState: defaultState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setLinkedProducts: (state, action) => {
      state.linkedProducts = action.payload;
    },
    addProductToCompareList: (state, action) => {
      state.comparingProducts = [...(state.comparingProducts || []), action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      console.log(action.payload)
    });
  },
})
export const productPageReducer = productPageSlice.reducer;
