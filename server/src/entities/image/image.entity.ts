import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TagsEntity } from "../tags/tags.entity";

@Entity('image')
export class ImageEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ name: 'file_path', comment: '文件路径' })
        filePath: string;

    @Column({ type: 'text', comment: '备注', nullable: true })
        remark: string;

    @Column({ comment: '文件标题', nullable: true })
        name: string;

    @Column({ comment: '原 url', nullable: true })
        link: string;

    @Column({ comment: '缩略图路径',nullable: true })
        coverFilePath: string;

    @Column({ name: 'is_delete', default: false, })
        isDelete: boolean;

    @CreateDateColumn({ name: 'create_at' })
        createAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
        updateAt: Date;

    @Column({ name: 'cloud_value', type: 'json', comment: '其他第三方服务', nullable: true })
        cloudValue: Array<Record<string, any>>;



    @ManyToMany(() => TagsEntity, (tag) => tag.id)
    @JoinTable()
        tags: TagsEntity[];
}
