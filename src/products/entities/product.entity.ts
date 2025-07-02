import { BaseEntity } from "src/common/entity/base.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
