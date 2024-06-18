import React, {memo, useCallback} from 'react';
import cls from './list-products.module.css';
import {LinkedProduct} from "../../../../models";

interface ListProductsProps {
    products: LinkedProduct[]
    addToCompareList: (id: string) => void
}

const typeNames = {
    'analog': 'Аналог',
    'related': 'Сопутствующий товар',
}

export const ListProducts = memo((props: ListProductsProps) => {
    const {
        products = [],
        addToCompareList,
    } = props;

    const handleItemClick = useCallback((id: string) => addToCompareList(id), [addToCompareList])

    return (
        <ul className={cls['list-products']}>
            {products.map(item => {
                return (<li key={item.id}>
                    {item.linkType &&
                        typeNames[item.linkType]}: <button onClick={() => handleItemClick(item.id)}>
                    {item.name}
                </button>
                </li>)
            })}
        </ul>
    );
})

ListProducts.displayName = 'list-products'