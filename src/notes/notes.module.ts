import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "./note.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Note])],
    providers:[],
})
export class NotesModule {}