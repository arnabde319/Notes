import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtGuard } from "src/users/guard";
import { CreateNoteDto } from "./dtos/createNote.dto";
import { UpdateNoteDto } from "./dtos/updateNote.dto";
import { NotesService } from "./notes.services";

@Controller('notes')
@UseGuards(JwtGuard)
export class NotesController {
    constructor(private notesService: NotesService){}

    @Get()
    getNotes(@Req() req: Request){
        return this.notesService.getNotes(req.user);
    }

    @Post()
    makeNote(@Req() req: Request, @Body() createNoteDto: CreateNoteDto ){
        return this.notesService.makeNote(req.user,createNoteDto);
    }

    @Get(":id")
    getOneNote(@Req() req: Request, @Param('id',ParseIntPipe) id: number){
        return this.notesService.getOneNote(req.user,id);
    }


    @Put(":id")
    editNote(@Param('id',ParseIntPipe) id: number,@Req() req: Request, @Body() updateNoteDto: UpdateNoteDto){
        return this.notesService.editNote(id,req.user,updateNoteDto);
    }
    @Delete(":id")
    deleteNote(@Param('id',ParseIntPipe) id: number,@Req() req: Request){
        return this.notesService.deleteNote(id,req.user);
    }

}