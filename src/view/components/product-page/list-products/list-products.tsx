import React, {memo, useCallback, useEffect, useState} from 'react';
import cls from './list-products.module.css';
import {LinkedProduct} from "../../../../models";
import {Modal} from "../../common/modal";
import {ProductCard} from "../product-card/product-card";
import {useLessThenMediaQuery} from "../../../hooks/media-query";

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
    const history = window.history
    const [productInModal, setProductInModal] = useState<LinkedProduct | null>(null);

    const handleItemClick = useCallback((item: LinkedProduct) => {
        if (item.linkType === 'analog') {
            console.log('Добавление в сравнение товара')
            addToCompareList(item.id)
        } else {
            console.log('Открытые модального окна')
            setProductInModal(item)
        }
    }, [addToCompareList])

    const handleModalClose = useCallback(() => {
        console.log('Закрытие модального окна')
        setProductInModal(() => null)
    }, [])

    const isMobile = useLessThenMediaQuery(450)

    useEffect(() => {
        if(isMobile) {
            history.pushState({}, '');
            window.onpopstate = function(event) {
                if(event.state){
                    console.log('Закрытие модального окна')
                    setProductInModal(() => null)
                } else {
                    history.pushState({}, '', window.location.href);
                }
            };
        }
    }, []);

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

            {!!productInModal &&
                <Modal onClose={handleModalClose}>
                    <ProductCard
                        name={productInModal.name}
                        id={productInModal.id}
                        price={productInModal.price}
                    />
                </Modal>
            }
        </>
    );
})

ListProducts.displayName = 'list-products'