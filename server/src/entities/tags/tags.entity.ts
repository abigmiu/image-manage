import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tags')
export class TagsEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @Column({ name: 'color_type', default: 0 })
        colorType: number

    @Column({ name: 'is_delete', default: false, })
        isDelete: boolean
}
