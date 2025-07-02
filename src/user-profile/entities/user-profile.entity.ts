import { BaseEntity } from './../../common/entity/base.entity'
import { User } from './../../users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserProfile extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    socialUrl: string;
    @Column()
    avatarUrL: string;
    @Column()
    brithDay: Date;
    @Column()
    sex: string;
    @OneToOne(() => User, (user) => user.userProfile) // Callback function để lấy ra User 
    @JoinColumn()
    user: User

}
