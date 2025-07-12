import { UserProfile } from './../../user-profile/entities/user-profile.entity';
import { isEmail, IsEmail } from 'class-validator';
import { promises } from 'dns';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as brcypt from "bcrypt"

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name:string
    @Column()
    email:string
    @Column({default: 18})
    age:number
    @Column ({nullable: true})
    password:string

    @OneToOne(() => UserProfile, (userProfile)=> userProfile, {cascade: true, lazy: true}) // Callback function để lấy ra UserProfile và casacde true để khi CUD User thì sẽ tự động CUD UserProfile
    userProfile: UserProfile

    @OneToMany(() => Product, (product)=> product.user, {cascade:true})
    products: Product[]

    @OneToMany(()=> Order, (order)=> order.user,{cascade:true, lazy:true})
    order: Promise<Order[]>

    @BeforeInsert() // trước khi insert vào database chay hàm băm password
    async hashPassword(){
        this.password = await brcypt.hash(this.password,10)
    }

   

    

}
