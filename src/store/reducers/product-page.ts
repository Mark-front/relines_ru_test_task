import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LinkedProduct, Product} from '../../models';
import {
    addProductToCompareList,
    getCategories,
    getLinkedProducts,
    getProduct,
    removeProductToCompareList
} from "../actions/product-page";
import {Category} from "../../gateways/models/category";
import {MappingProducts} from "../../use-cases/MappingProducts";

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                state.product = action.payload;
            })
            .addCase(getLinkedProducts.fulfilled, (state, action) => {
                state.linkedProducts = new MappingProducts(state.product?.categoryId, action.payload).getMappingProducts();
            })
            .addCase(getCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories = [...action.payload];
            })
            .addCase(addProductToCompareList, (state, action) => {
                if(state.comparingProducts && state.comparingProducts.find(item => item.id === action.payload.id)) return
                state.comparingProducts = [...(state.comparingProducts || []), action.payload];
            })
            .addCase(removeProductToCompareList, (state, action) => {
                state.comparingProducts = [...(state.comparingProducts || []).filter(item => item.id !== action.payload)]
            })
    },
})
export const productPageReducer = productPageSlice.reducer;
