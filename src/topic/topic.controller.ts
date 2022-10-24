import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TopicDto } from './topic.dto';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Post('/add')
    public async addTopic(@Body() topicDto: TopicDto) {
        return await this.topicService.addTopic(topicDto);
    }

    // @Get('/:name')
    // public async findTopic(@Param('name') reqTopic : string) {
    //     return await this.topicService.findTopic(reqTopic);
    // }
}
