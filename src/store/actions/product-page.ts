import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import { LinkedProduct, Product } from '../../models';
import {MockProductPageGateway} from "../../gateways/product-page";

const API = new MockProductPageGateway();
export const setProduct = createAction<Product>('product-card-page/set-product-card');

export const setLinkedProducts = createAction<LinkedProduct[]>('product-card-page/set-linked-product-card');

export const addProductToCompareList = createAction<Product>(
  'product-card-page/add-product-card-to-compare-list',
);

export const fetchProduct = createAsyncThunk(
    'product-card-page/get-products',
    async (id: string) => {
        const response = await API.getProduct(id)
        return response
    },
)
