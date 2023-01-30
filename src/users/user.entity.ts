import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Note } from "src/notes/note.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToMany(() => Note, note => note.user, {
        cascade: true
    })
    public notes: Note[];
}