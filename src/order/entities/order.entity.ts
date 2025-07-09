
import { OrderDetail } from "src/order_detail/entities/order_detail.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
     id:number
    @Column()
    orderDateL: Date
    @Column()
   toltalPrice: number
    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderId, {cascade:true, lazy: true}) // lazy: true để khi lấy ra Order thì sẽ không lấy OrderDetail mà chỉ khi nào cần thì mới lấy ra và ta có thể awati và . nó ra mà ko cần truy vấn
    orderDetail: Promise<OrderDetail []>

    @ManyToOne(() => User, (user)=> user.order,)
    user: User;
}