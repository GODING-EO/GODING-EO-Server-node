import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { ForbiddenError, NotFoundError } from 'src/shared/exception';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        private readonly postRepository: PostRepository
    ) {}

    public async createPost(postDto: PostDto, user: User) {
        return await this.postRepository.createPost(postDto, user);
    }

    public async getOnePost(post_id: number) {
        const post = await this.postRepository.getOnePost(post_id);
        if(!post) throw new NotFoundError;
        else return post;
    }

    public async getAllPost() {
       return await this.postRepository.getAllPost();
    }

    public async deletePost(post_id: number, user: User) {
        if(!await this.postRepository.getOnePost(post_id)) {
            throw  new NotFoundError;
        } else if(await this.postRepository.checkUserbyWriter(post_id, user) == true){
            return await this.postRepository.deletePost(post_id);
        } throw  new ForbiddenError;
    }

    public async updatePost(post_id: number, user: User, postDto: PostDto) {
        if(!await this.postRepository.getOnePost(post_id)) {
            throw new NotFoundError;
        } else if(await this.postRepository.checkUserbyWriter(post_id, user) == true){
            return await this.postRepository.updatePost(post_id, postDto);
        } throw new ForbiddenError;
    }

    public async searchPost(searchWord: string) {
        return await this.postRepository.searchPost(searchWord);
    }
}
