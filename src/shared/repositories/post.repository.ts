import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostDto } from "src/post/dto/post.dto";
import { Repository } from "typeorm";
import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class PostRepository {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) {}

    async savePost(postDto: PostDto, user: User) {
        const post = new Post();

        console.log(postDto, user);
        post.title = postDto.title;
        post.content = postDto.content;
        post.school_id = postDto.school_id;
        post.topic_id = postDto.topic_id;
        post.image = postDto.image;
        post.user_id = user.id;
        
        const newPost = await this.postRepository.save(post);
        
        return newPost;
    };

    async getPost(post_id: number) {
        return await this.postRepository.createQueryBuilder('post')
            .select('post.id')
            .addSelect('post.title')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('post.user_id')
            .addSelect('post.school_id')
            .addSelect('post.topic_id')
            .addSelect('post.createdAt')
            .where('post.id = :post_id', { post_id })
            .getOne();
    }

    async deletePost(post_id: number) {
        return this.postRepository.createQueryBuilder('post')
            .delete()
            .from(Post)
            .where('id = :post_id', { post_id })
            .execute()
    }

    async checkUserbyWriter(post_id: number, user: User): Promise<boolean>{
        const writer = (await this.getPost(post_id)).user_id;
        if(writer == user.id) {
            return true;
        }
        return false;
    }
}