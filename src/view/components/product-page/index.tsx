import {FC, useCallback, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {dispatch} from "../../../store";
import {
    addProductToCompareList,
    getCategories,
    getLinkedProducts,
    getProduct, removeProductToCompareList
} from "../../../store/actions/product-page";
import {
    categoriesSelector,
    compareListSelector,
    linkedProductsSelector,
    productSelector
} from "../../../store/selectors/product-page";
import cls from './product-page.module.css'
import {ProductCard} from "./product-card/product-card";
import {MappingProducts} from "../../../use-cases/MappingProducts";
import {ListProducts} from "./list-products/list-products";

export const ProductPage: FC = () => {
    let {productId = ''} = useParams();
    const product = useSelector(productSelector)
    const linkedProducts = useSelector(linkedProductsSelector)
    const compareList = useSelector(compareListSelector)

    useEffect(() => {
        dispatch(getProduct(productId))
        dispatch(getLinkedProducts(productId))
    }, []);

    const addToCompareList = useCallback((id: string) => {
        const product = linkedProducts.find(item => item.id === id);
        console.log(product)
        if(product) {
            dispatch(addProductToCompareList(product))
        }
    }, [linkedProducts])

    const removeFromCompareList = useCallback((id: string) => {
            dispatch(removeProductToCompareList(id))
    }, [])

    return <>
        <div className={cls.container}>
            <>
                {product &&
                    <ProductCard
                        id={product?.id}
                        name={product?.name}
                        price={product?.price}
                        category={product?.category}
                    />
                }
                <div className={cls.list}>
                    {compareList.map((item, index) => (
                        <ProductCard
                            key={item.id + item.name + index}
                            id={item?.id}
                            name={item?.name}
                            price={item?.price}
                            category={item?.category}
                            handleRemove={removeFromCompareList}
                        />
                    ))}
                </div>
            </>
        </div>
        <ListProducts
            products={linkedProducts}
            addToCompareList={addToCompareList}
        />
    </>;
};
