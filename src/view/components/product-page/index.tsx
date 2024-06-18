import {FC, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {dispatch} from "../../../store";
import {getCategories, getLinkedProducts, getProduct} from "../../../store/actions/product-page";
import {categoriesSelector, linkedProductsSelector, productSelector} from "../../../store/selectors/product-page";
import cls from './product-page.module.css'
import {ProductCard} from "./product-card/product-card";
import {MappingProducts} from "../../../use-cases/MappingProducts";
import {ListProducts} from "./list-products/list-products";

export const ProductPage: FC = () => {
    let {productId = ''} = useParams();
    const product = useSelector(productSelector)
    const linkedProducts = useSelector(linkedProductsSelector)
    const categories = useSelector(categoriesSelector)

    useEffect(() => {
        dispatch(getProduct(productId))
        dispatch(getLinkedProducts(productId))
        dispatch(getCategories())
    }, []);

    useEffect(() => {
        console.log(linkedProducts)
    }, [product,
        linkedProducts,
        categories,]);

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
                {/*{linkedProducts.map(item => (*/}
                {/*    <ProductCard*/}
                {/*        key={item.id}*/}
                {/*        id={item?.id}*/}
                {/*        name={item?.name}*/}
                {/*        price={item?.price}*/}
                {/*        category={item?.category}*/}
                {/*    />*/}
                {/*))}*/}


            </>
        </div>
        <ListProducts products={linkedProducts}/>
    </>;
};
