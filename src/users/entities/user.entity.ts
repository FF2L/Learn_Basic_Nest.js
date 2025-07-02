import { UserProfile } from './../../user-profile/entities/user-profile.entity';
import { Delete } from '@nestjs/common';
import { isEmail, IsEmail } from 'class-validator';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToOne(() => UserProfile, (userProfile)=> userProfile, {cascade: true}) // Callback function để lấy ra UserProfile và casacde true để khi CUD User thì sẽ tự động CUD UserProfile
    userProfile: UserProfile

    @OneToMany(() => Product, (product)=> product.user, {cascade:true})
    products: Product[]

}
