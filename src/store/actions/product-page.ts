import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import { LinkedProduct, Product } from '../../models';
import {MockProductPageGateway} from "../../gateways/product-page";
import {IProductPageRepository} from "../../services/products/interfaces";

const API: IProductPageRepository = new MockProductPageGateway();
export const setProduct = createAction<Product>('product-card-page/set-product-card');

export const setLinkedProducts = createAction<LinkedProduct[]>('product-card-page/set-linked-product-card');

export const addProductToCompareList = createAction<Product>(
  'product-card-page/add-product-card-to-compare-list',
);

export const removeProductToCompareList = createAction<string>(
    'product-card-page/remove-product-card-to-compare-list',
);

export const getProduct = createAsyncThunk(
    'product-card-page/get-products',
    async (id: string) => {
        const response = await API.getProduct(id)
        return response
    },
)

export const getLinkedProducts = createAsyncThunk(
    'product-card-page/get-linked-product-card',
    async (id: string) => {
        const response = await API.getLinkedProducts(id)
        return response
    },
)

export const getCategories = createAsyncThunk(
    'product-card-page/get-categories',
    async () => {
        const response = await API.getCategories()
        return response
    },
)

