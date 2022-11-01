import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/shared/entities/user.entity';
import { PostLikeService } from './post-like.service';

@Controller('post')
export class PostLikeController {
    constructor(private readonly postLikeService: PostLikeService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('/:post_id/like')
    public async addPostLike(
        @Param('post_id') post_id: number,
        @Req() req: Request
    ) {
        await this.postLikeService.addPostLike(
            post_id,
            req.user as User
        );
        return { statusCode: 200, message: 'postlike success'};
    }
}
