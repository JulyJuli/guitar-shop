import { Injectable, EventEmitter } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';

@Injectable()
export class ProductRepository {
    isAvailableProductListChanged = new EventEmitter<void>();

    private availableProducts: { product: ProductModel, numberOfAvailableProducts: number }[] = [
        {
            product:
                new ProductModel(
                    1, 'Jackson JS22 JS-Series Dinky, Natural Oil',
                    200,
                    new Date(2020, 3, 15),
                    'Developed by Taylor’s Master Builder Andy Powers, this is an innovative new style of bracing.'
                    + 'It tackles the issue of achieving sustain and tone without sacrificing volume. V-Class bracing allows'
                    + 'the guitar’s top to move and vibrate in a more stable manner, resulting in more focus and response from the wood.'
                    + 'This control means more volume and projection. ',
                    'https://cdn.shopify.com/s/files/1/1750/3791/products/Reverb_Pics_Website_Redo_-_108_of_130_480x480.jpg?v=1565021194',
                    true),
            numberOfAvailableProducts: 100
        },
        {
            product:
                new ProductModel(
                    2,
                    'Dean MLX Flame Top, Trans Red',
                    520,
                    new Date(2019, 3, 15),
                    'Developed by Taylor’s Master Builder Andy Powers, this is an innovative new style of bracing.'
                    + 'It tackles the issue of achieving sustain and tone without sacrificing volume. V-Class bracing allows'
                    + 'the guitar’s top to move and vibrate in a more stable manner, resulting in more focus and response from the wood.'
                    + 'This control means more volume and projection. ',
                    'https://cdn.shopify.com/s/files/1/1750/3791/products/ReverbandWeb4.4.20-112of114_480x480.jpg?v=1586638055',
                    true),
            numberOfAvailableProducts: 50
        },
        {
            product:
                new ProductModel(
                    3,
                    'Ibanez JEM Junior Steve Vai, White',
                    440,
                    new Date(2020, 6, 5),
                    'Developed by Taylor’s Master Builder Andy Powers, this is an innovative new style of bracing.'
                    + 'It tackles the issue of achieving sustain and tone without sacrificing volume. V-Class bracing allows'
                    + 'the guitar’s top to move and vibrate in a more stable manner, resulting in more focus and response from the wood.'
                    + 'This control means more volume and projection. ',
                    'https://cdn.shopify.com/s/files/1/1750/3791/products/Reverb_Pics_Website_Redo_-_88_of_130_480x480.jpg?v=1565019134',
                    true),
            numberOfAvailableProducts: 20
        },
        {
            product:
                new ProductModel(4,
                    'Junior Steve Vai, White',
                    840,
                    new Date(2020, 6, 5),
                    'Developed by Taylor’s Master Builder Andy Powers, this is an innovative new style of bracing.'
                    + 'It tackles the issue of achieving sustain and tone without sacrificing volume. V-Class bracing allows'
                    + 'the guitar’s top to move and vibrate in a more stable manner, resulting in more focus and response from the wood.'
                    + 'This control means more volume and projection. ',
                    'https://cdn.shopify.com/s/files/1/1750/3791/products/ReverbandWeb4.11.20-23of65_480x480.jpg?v=1586638740',
                    true),
            numberOfAvailableProducts: 20
        },
        {
            product:
                new ProductModel(
                    5,
                    'Steve Vai Black',
                    440,
                    new Date(2020, 6, 5),
                    'Developed by Taylor’s Master Builder Andy Powers, this is an innovative new style of bracing.'
                    + 'It tackles the issue of achieving sustain and tone without sacrificing volume. V-Class bracing allows'
                    + 'the guitar’s top to move and vibrate in a more stable manner, resulting in more focus and response from the wood.'
                    + 'This control means more volume and projection. ',
                    'https://cdn.shopify.com/s/files/1/1750/3791/products/Reverb_Pics_Website_Redo_-_53_of_130_480x480.jpg?v=1565020772',
                    true),
            numberOfAvailableProducts: 20
        },
        {
            product:
                new ProductModel(
                    6,
                    'Ibanez JEM Senior',
                    1440,
                    new Date(2020, 6, 15),
                    'Developed by Taylor’s Master Builder Andy Powers, this is an innovative new style of bracing.'
                    + 'It tackles the issue of achieving sustain and tone without sacrificing volume. V-Class bracing allows'
                    + 'the guitar’s top to move and vibrate in a more stable manner, resulting in more focus and response from the wood.'
                    + 'This control means more volume and projection. ',
                    'https://cdn.shopify.com/s/files/1/1750/3791/products/Reverb_Pics_Website_Redo_-_98_of_130_480x480.jpg?v=1565019031',
                    true),
            numberOfAvailableProducts: 20
        }
    ];

    getProducts(): ProductModel[] {
        return this.availableProducts.map(p => p.product);
    }

    decreaseNumberOfSpecificProduct(productId: number, numberOfProducts: number) {
        const existingProduct = this.availableProducts.find(p => p.product.id === productId);
        existingProduct.numberOfAvailableProducts > numberOfProducts
            ? existingProduct.numberOfAvailableProducts -= numberOfProducts
            : existingProduct.numberOfAvailableProducts = 0;

        if (existingProduct.numberOfAvailableProducts === 0) {
            existingProduct.product.isAvailable = false;
        }

        this.isAvailableProductListChanged.emit();
    }

    increaseNumberOfSpecificProduct(productId: number, numberOfProducts: number) {
        const existingProduct = this.availableProducts.find(p => p.product.id === productId);
        if (existingProduct) {
            existingProduct.numberOfAvailableProducts += numberOfProducts;
            existingProduct.product.isAvailable = true;
        }

        this.isAvailableProductListChanged.emit();
    }
}
