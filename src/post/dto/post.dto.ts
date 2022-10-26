import { IsNumber, IsString } from "class-validator"

export class PostDto {
    @IsString()
    title: string;
    
    @IsString()
    content: string;

    @IsString()
    image: string;

    @IsNumber()
    school_id: number;

    @IsNumber()
    topic_id: number;
}