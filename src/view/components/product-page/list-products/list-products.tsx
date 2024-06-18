import React, {memo} from 'react';
import cls from './list-products.module.css';
import {LinkedProduct} from "../../../../models";

interface ListProductsProps {
    products: LinkedProduct[]
}

const typeNames = {
    'analog': 'Аналог',
    'related': 'Сопутствующий товар',
}

export const ListProducts = memo((props: ListProductsProps) => {
    const {
        products = []
    } = props;

    return (
        <ul className={cls['list-products']}>
            {products.map(item => {
                return (<li key={item.id}>
                    {item.linkType && typeNames[item.linkType]}: <button>{item.name}</button>
                </li>)
            })}
        </ul>
    );
})

ListProducts.displayName = 'list-products'