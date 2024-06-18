import React, {memo, useEffect} from 'react';
import cls from './product-card.module.css';
import {Product} from "../../../../models";

interface ProductProps extends Product {
    handleRemove?: (id: string) => void
}

export const ProductCard = memo((props: ProductProps) => {
    const {
        name,
        id,
        price,
        handleRemove
    } = props;

    return (
        <div className={cls.product}>
            <h3>{name}</h3>
            Price {price}
            {!!handleRemove && <button onClick={() => handleRemove(id)}> remove </button>}
        </div>
    );
})

ProductCard.displayName = 'ProductCard'