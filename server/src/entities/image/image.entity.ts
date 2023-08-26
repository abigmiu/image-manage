import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TagsEntity } from "../tags/tags.entity";

@Entity('image')
export class ImageEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ name: 'file_path', comment: '文件路径' })
        filePath: string;

    @Column({ type: 'text', comment: '备注' })
        remark: string;

    @Column({ comment: '文件标题' })
        name: string;

    @Column({ comment: '原 url' })
        link: string;

    @Column({ comment: '缩略图路径' })
        coverFilePath: string;

    @Column({ name: 'is_delete', default: false, })
        isDelete: boolean;

    @CreateDateColumn({ name: 'create_ta' })
        createAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
        updateAt: Date;

    @Column({ name: 'cloud_value', type: 'json', comment: '其他第三方服务' })
        cloudValue: Array<Record<string, any>>;



    @ManyToMany(() => TagsEntity, (tag) => tag.id)
    @JoinTable()
        tags: TagsEntity[];
}
