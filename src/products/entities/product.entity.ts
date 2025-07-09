import { BaseEntity } from "src/common/entity/base.entity";
import { Order } from "src/order/entities/order.entity";
import { OrderDetail } from "src/order_detail/entities/order_detail.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    type:string;
    @Column()
    price:number;

    @ManyToOne(() => User,(user) => user.products)
    user: User

     @OneToMany(() => OrderDetail, (orderDetail)=> orderDetail.productId, {cascade:true, lazy:true})
     orderDetail: Promise<Order[]>
}
