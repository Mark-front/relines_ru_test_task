import {IMappingProducts, } from "../services/products/interfaces";
import {Category, LinkedProduct, Product, ProductLinkType} from "../models";

export class MappingProducts implements IMappingProducts {
    private productCategoryId: string | undefined;
    private products: Product[];
    constructor(productCategoryId: string | undefined, products: Product[]) {
        this.productCategoryId = productCategoryId
        this.products = products
    }
    getMappingProducts() {
        const products: LinkedProduct[] = this.products.map(product => {
            let linkType: ProductLinkType

            if (typeof product.categoryId !== 'undefined') {
                linkType = 'related'
            }

            if (this.productCategoryId === product.categoryId) {
                linkType = 'analog'
            }

            return {
                ...product,
                linkType: linkType
            }
        })

        return products
    }
}