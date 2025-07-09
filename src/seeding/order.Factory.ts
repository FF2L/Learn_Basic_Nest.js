import { faker } from "@faker-js/faker";
import { Order } from "src/order/entities/order.entity";
import { setSeederFactory } from "typeorm-extension";


export const orderFactory = setSeederFactory(Order, () =>{
    const order = new Order();

    order.orderDateL = faker.date.past()
    order.toltalPrice = +faker.commerce.price({ min: 1000, max: 10000, dec: 0 });  

    return order;
})