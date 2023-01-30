import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { find } from "rxjs";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { CreateNoteDto } from "./dtos/createNote.dto";
import { UpdateNoteDto } from "./dtos/updateNote.dto";
import { Note } from "./note.entity";

@Injectable()
export class NotesService{
    constructor(@InjectRepository(User) private userRepository: Repository<User>,@InjectRepository(Note) private noteRepository: Repository<Note>) {}
    
    async getNotes(user: any){
        const findUser = await this.userRepository.find({
            where:{
                id: user.id
            },
            relations:{
                notes: true
            }
        });
        if(!findUser){
            throw new BadRequestException('Invalid User')
        }
        return findUser[0].notes;
    }

    async makeNote(user: any,newNote: CreateNoteDto){
        const findUser = await this.userRepository.find({
            where:{
                id: user.id
            }
        });
        if(!findUser){
            throw new BadRequestException('Invalid User');
        }
        try{
            const note = this.noteRepository.create(newNote);
            note.user=findUser[0];
            const res = await this.noteRepository.save(note);
            return res;
        }catch(err){
            throw err;
        }
    }

    async getOneNote(user: any, id: number){
        const findUser = await this.userRepository.find({
            where:{
                id: user.id
            },
            relations: {
                notes: true
            }
        });
        if(!findUser){
            throw new BadRequestException('Invalid User');
        }
        const note = findUser[0].notes.find((note)=>note.id===id);
        if(!note)
            throw new BadRequestException("No such note available");
        return note;
    }

    async editNote(id:number, user: any, updateNoteDto: UpdateNoteDto){
        const findNote = await this.noteRepository.find({
            where:{
                id,
                user: user.id
            }
        })

        if(findNote.length===0){
            throw new BadRequestException('No Note Available');
        }
        findNote[0].note=updateNoteDto.note;
        const res = await this.noteRepository.save(findNote[0]);
        return res; 
    }

    async deleteNote(id: number,user: any){
        const findNote = await this.noteRepository.find({
            where:{
                id,
                user: user.id
            }
        })
        if(findNote.length===0){
            throw new BadRequestException('No Note Available');
        }
        try{
            const del = await this.noteRepository.remove(findNote[0]);
            return del;
        }
        catch(err){
            throw err;
        }
    }
}