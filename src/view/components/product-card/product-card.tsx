import React, {memo, useEffect} from 'react';
import cls from './product-card.module.css';
import {Product} from "../../../models";

interface ProductProps extends Product {
    className?: string;
}

export const ProductCard = memo((props: ProductProps) => {
    const {
        category,
        name,
        id,
        price,
        className,
    } = props;

    return (
        <div className={cls.product}>
            <h3>{name}</h3>
            Price {price}
        </div>
    );
})

ProductCard.displayName = 'ProductCard'