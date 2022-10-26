import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/shared/entities/user.entity';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    public async createPost(
        @Body() postReqData: PostDto,
        @Req() req: Request
    ) {
        return await this.postService.createPost(
            postReqData,
            req.user as User,
        );
    }

    @Get('/:post_id')
    public async ReadPost(@Param('post_id') post_id: number) {
        return await this.postService.getPost(post_id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:post_id')
    public async DeletePost(
        @Param('post_id') post_id: number,
        @Req() req:Request
    ) {
        await this.postService.deletePost(
            post_id,
            req.user as User,
        );
        return { status: 200, message: 'delete success'};
    }
}
