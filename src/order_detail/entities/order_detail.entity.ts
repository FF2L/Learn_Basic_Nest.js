import { Order } from "src/order/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ForeignKey, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class OrderDetail {
    @PrimaryColumn()
    orderId: number
    @PrimaryColumn()
    productId: number

    @ManyToOne(() => Order, (order) => order.orderDetail, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'orderId'})
    order: Promise<Order>;

    @ManyToOne(() => Product, (product) => product.orderDetail, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'productId'})
    product: Promise<Product>;


    @Column()
    quantity: number;



}
