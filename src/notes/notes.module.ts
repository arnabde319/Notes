import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { Note } from "./note.entity";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.services";

@Module({
    imports: [TypeOrmModule.forFeature([Note]),UsersModule],
    providers:[NotesService],
    controllers:[NotesController]

})
export class NotesModule {}