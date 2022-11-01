import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
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
        await this.topicLikeService.addTopicLike(
            topic_id,
            req.user as User
        );
        return { statusCode: 200, message: 'topiclike success' };
    }
}
