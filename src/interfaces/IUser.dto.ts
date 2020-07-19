import { IsString, MinLength } from 'class-validator';

export class IUser {
    @IsString()
    name: string;

    @IsString()
    @MinLength(6)
    pass: string;
}