import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/add')
    public async addTopic(@Body('topic') topicWord: string) {
        return await this.topicService.addTopic(topicWord);
    }

    @Get('search')
    public async searchTopic(@Query('where') topicWord : string) {
        return await this.topicService.searchTopic(topicWord);
    }
}
