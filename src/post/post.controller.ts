import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { User } from 'src/shared/entities/user.entity';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    public async createPost(
        @Body() postReqData: PostDto,
        @Req() req: Request,
        @UploadedFile() image: Express.MulterS3.File
    ) {
        return await this.postService.createPost(
            postReqData,
            (<any>image)?.location,
            req.user as User,
        );
    }

    @Get('search')
    public async searchPost(@Query('where') searchWord: string) {
        return { Post: await this.postService.searchPost(searchWord) };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/liketopic')
    public async getPostOfLikeTopic(
        @Req() req: Request
    ) {
        const post = await this.postService.getPostOfLikeTopic(req.user as User);
        if(!post) return { statusCode: 200, message: 'No LikeTopic' };
        return { likeTopicPost: post };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/likeschool')
    public async getPostOfLikeSchool(
        @Req() req: Request
    ) {
        const post = await this.postService.getPostOfLikeSchool(req.user as User);
        if(!post) return { statusCode: 200, message: 'No LikeSchool' };
        return { likeSchoolPost: post };
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('/mypost')
    public async getMyPost(@Req() req: Request) {
        return { Post: await this.postService.getMyPost(req.user as User) };
    }

    @Get('/:post_id')
    public async getOnePost(@Param('post_id') post_id: number) {
        return { Post: await this.postService.getOnePost(post_id) };
    } 

    @Get()
    public async getAllPost() {
        return { Post: await this.postService.getAllPost() };
    }


    @UseGuards(AuthGuard('jwt'))
    @Delete('/:post_id')
    public async deletePost(
        @Param('post_id') post_id: number,
        @Req() req:Request
    ) {
        await this.postService.deletePost(
            post_id,
            req.user as User,
        );
        return { statusCode: 200, message: 'delete success' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:post_id')
    public async updatePost(
        @Param('post_id') post_id: number,
        @Body() postReqData: PostDto,
        @Req() req: Request
    ) {
        await this.postService.updatePost(
            post_id,
            req.user as User,
            postReqData
        );
        return { statusCode: 200, message: 'update success' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/:post_id/report')
    public async reportPost(
        @Param('post_id') post_id: number
    ) {
        await this.postService.reportPost(post_id);
        return { statusCode: 201, message: 'report success' };
    }
}
