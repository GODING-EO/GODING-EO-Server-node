import { Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/shared/entities/user.entity';
import { TopicLikeService } from './topic-like.service';

@Controller('topic')
export class TopicLikeController {
    constructor(private readonly topicLikeService: TopicLikeService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/:topic_id/like')
    public async addTopicLike(
        @Param('topic_id')  topic_id: number,
        @Req() req: Request
    ) {
        const boolean = await this.topicLikeService.TopicLike(
            topic_id,
            req.user as User
        );
        if(boolean == true) return { statusCode: 201, message: 'topicLike success' };
        else if(boolean == false) return { statusCode: 200, message: 'Cancel topiclike success' };
    }
}
