import { MappingProducts } from './MappingProducts';
import {Product} from "../models";

describe('MappingProducts', () => {
    const mockProductCategoryId = '123';
    const mockProducts: Product[] = [
        { id: '1', price: 100, name: 'Product 1', categoryId: '123' },
        { id: '2', price: 200, name: 'Product 2', categoryId: '456' },
    ];

    it('should correctly map products with related link type', () => {
        const mappingProducts = new MappingProducts(mockProductCategoryId, mockProducts);
        const mappedProducts = mappingProducts.getMappingProducts();

        expect(mappedProducts.length).toBe(2);
        expect(mappedProducts[0].linkType).toBe('related');
        expect(mappedProducts[1].linkType).toBeUndefined(); // No linkType should be set
    });

    it('should correctly map products with analog link type', () => {
        const mappingProducts = new MappingProducts('456', mockProducts);
        const mappedProducts = mappingProducts.getMappingProducts();

        expect(mappedProducts.length).toBe(2);
        expect(mappedProducts[0].linkType).toBeUndefined(); // No linkType should be set
        expect(mappedProducts[1].linkType).toBe('analog');
    });
});