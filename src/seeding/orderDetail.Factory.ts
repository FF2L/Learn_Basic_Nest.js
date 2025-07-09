import { faker } from "@faker-js/faker";
import { OrderDetail } from "src/order_detail/entities/order_detail.entity";
import { setSeederFactory } from "typeorm-extension";


export const orderDetailFactory = setSeederFactory(OrderDetail, () =>{
    const orderDetail = new OrderDetail();

    orderDetail.quantity = faker.number.int({ min: 1, max: 10 });

    return orderDetail;
})