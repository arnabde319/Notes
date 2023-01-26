import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note: string;

    @ManyToOne(() => User, user => user.notes, {onDelete: 'CASCADE'})
    user: User
}