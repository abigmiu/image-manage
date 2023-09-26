import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        account: string;

    @Column()
    @Exclude()
        password: string;

    @Column({ name: 'is_delete', default: false, })
        isDelete: boolean;

    @CreateDateColumn({ name: 'create_at' })
        createAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
        updateAt: Date;
}
