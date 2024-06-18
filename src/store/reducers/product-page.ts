import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LinkedProduct, Product} from '../../models';
import {getCategories, getLinkedProducts, getProduct} from "../actions/product-page";
import {Category} from "../../gateways/models/category";

type CatalogPageState = {
    product: Product | undefined;
    linkedProducts: LinkedProduct[] | undefined;
    comparingProducts: Product[] | undefined;
    categories: Category[] | undefined;
};

const defaultState: CatalogPageState = {
    product: undefined,
    linkedProducts: undefined,
    comparingProducts: undefined,
    categories: undefined
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
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                state.product = action.payload;
            })
            .addCase(getLinkedProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                //@ts-ignore
                state.linkedProducts = [...action.payload];
            })
            .addCase(getCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories = [...action.payload];
            })
    },
})
export const productPageReducer = productPageSlice.reducer;
