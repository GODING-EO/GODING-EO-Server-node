import { IsNumber, IsString } from "class-validator"

export class TopicDto {
    @IsString()
    name: string;
}