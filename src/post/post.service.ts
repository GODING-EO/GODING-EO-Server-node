import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { NotFoundError } from 'src/shared/exception';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { Repository } from 'typeorm';
import { Post } from '../shared/entities/post.entity';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        private readonly postRepository: PostRepository
    ) {}

    public async createPost(postDto: PostDto, user: User) {
        return await this.postRepository.savePost(postDto, user);
    }

    public async getPost(post_id: number) {
        const post = await this.postRepository.getPost(post_id);
         
        if(!post) {
            throw new NotFoundError;
        } else return post;
    }
}
