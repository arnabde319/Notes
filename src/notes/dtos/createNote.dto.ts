import { IsNotEmpty, IsString } from "class-validator"
import { User } from "src/users/user.entity";


export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    note: string;
}

