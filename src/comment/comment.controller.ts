import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/shared/entities/user.entity';
import { CommentService } from './comment.service';

@Controller('post')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/:post_id/comment')
    public async createComment(
        @Param('post_id') post_id: number,
        @Body('content') content: string,
        @Req() req: Request, 
    ) {
        return await this.commentService.createComment(
            content,
            req.user as User,
            post_id
        );
    }

    @Get('/:post_id/comment/:comment_id')
    public async getOneComment(
        @Param('comment_id') comment_id: number
    ) { return await this.commentService.getOneComment(comment_id); }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:post_id/comment/:comment_id')
    public async updateComment(
        @Param('comment_id') comment_id: number,
        @Body('content') content: string,
        @Req() req: Request
    ) {
        await this.commentService.updateComment(
            content,
            req.user as User,
            comment_id
        );
        return { statusCode: 200, message: 'update success' }
    }
}
