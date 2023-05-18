//    posts/posts.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bookUser")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成

    @Column({ length:50 })
    account: string;

    @Column()
    password: string;

    @Column()
    salt: string

}