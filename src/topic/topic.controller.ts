import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Post('/add')
    public async addTopic(@Body('topic') topicWord: string) {
        return await this.topicService.addTopic(topicWord);
    }

    @Get('search')
    public async findTopic(@Query('topic') topicWord : string) {
        return await this.topicService.searchTopic(topicWord);
    }
}
