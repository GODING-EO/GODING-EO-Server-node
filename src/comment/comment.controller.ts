import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
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
        @Body() content: string,
        @Req() req: Request, 
    ) {
        console.log(content);
        return await this.commentService.createComment(
            content,
            req.user as User,
            post_id
        );
    }
}
