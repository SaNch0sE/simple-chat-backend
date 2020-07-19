import { IsString, Min } from 'class-validator';

export class IUser {
    @IsString()
    name: string;

    @IsString()
    @Min(6)
    pass: string;
}