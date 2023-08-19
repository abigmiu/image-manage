import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";


@Entity('file')
export class FileEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ name: 'file_name' })
        fileName: string;
}
