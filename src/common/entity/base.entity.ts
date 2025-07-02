import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export abstract class BaseEntity {
    @CreateDateColumn()
    create_at:Date
    @UpdateDateColumn()
    update_at:Date
    @DeleteDateColumn()
    delete_at:Date
}