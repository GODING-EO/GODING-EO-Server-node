import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/shared/entities/user.entity';
import { PostLikeService } from './post-like.service';

@Controller('post')
export class PostLikeController {
    constructor(private readonly postLikeService: PostLikeService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/:post_id/like')
    public async addPostLike(
        @Param('post_id') post_id: number,
        @Req() req: Request
    ) {
        const boolean = await this.postLikeService.PostLike(
            post_id,
            req.user as User
        );
        if(boolean == true) return { statusCode: 201, message: 'postlike success' };
        else if(boolean == false) return { statusCode: 200, message: 'Cancel postlike success' };
    }

    @Get('/:post_id/like')
    public async CountPostLike(
        @Param('post_id') post_id: number
    ) {
        return this.postLikeService.CountPostLike(post_id);
    }
}
