import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/add')
    public async addTopic(@Body('topic') topic_name: string) {
        return await this.topicService.addTopic(topic_name);
    }

    @Get('search')
    public async searchTopic(@Query('where') search_word : string) {
        return await this.topicService.searchTopic(search_word);
    }
}
