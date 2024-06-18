import React, {memo, useCallback, useState} from 'react';
import cls from './list-products.module.css';
import {LinkedProduct} from "../../../../models";
import {Modal} from "../../common/modal";
import {ProductCard} from "../product-card/product-card";

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

    const [productInModal, setProductInModal] = useState<LinkedProduct | null>(null);

    const handleItemClick = useCallback((item: LinkedProduct) => {
        if(item.linkType === 'analog') {
            addToCompareList(item.id)
        } else {
            setProductInModal(item)
        }
    }, [addToCompareList])

    const handleModalClose = useCallback(() => setProductInModal(() => null), [])

    return (
        <>
            <ul className={cls['list-products']}>
                {products.map(item => {
                    return (<li key={item.id}>
                        {item.linkType &&
                            typeNames[item.linkType]}: <button onClick={() => handleItemClick(item)}>
                        {item.name}
                    </button>
                    </li>)
                })}
            </ul>

            {!!productInModal && <Modal onClose={handleModalClose}>
                <ProductCard
                    name={productInModal.name}
                    id={productInModal.id}
                    price={productInModal.price}
                />
            </Modal>}
        </>
    );
})

ListProducts.displayName = 'list-products'