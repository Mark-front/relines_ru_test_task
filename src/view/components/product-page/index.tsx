import {FC, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {dispatch} from "../../../store";
import {fetchProduct} from "../../../store/actions/product-page";
import {productSelector} from "../../../store/selectors/product-page";
import cls from './product-page.module.css'
import {ProductCard} from "../product-card/product-card";

export const ProductPage: FC = () => {
  let { productId = '' } = useParams();
  const product = useSelector(productSelector)

  useEffect(() => {
    dispatch(fetchProduct(productId))
  }, []);

  return <div className={cls.container}>
    {product &&
        <ProductCard
            id={product?.id}
            name={product?.name}
            price={product?.price}
            category={product?.category}
        />
    }

  </div>;
};
