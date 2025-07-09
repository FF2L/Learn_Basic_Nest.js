import { faker } from "@faker-js/faker";
import { Product } from "src/products/entities/product.entity";
import { setSeederFactory } from "typeorm-extension";


export const productFactory = setSeederFactory(Product, () =>{
    const product = new Product();
    product.name = faker.commerce.productName();
    product.type = faker.commerce.product();
    product.price = +faker.commerce.price({ min: 1000, max: 10000, dec: 0 });


    return product;
})