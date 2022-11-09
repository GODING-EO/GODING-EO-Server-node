import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostDto, UpdatePostDto } from "src/post/dto/post.dto";
import { Repository } from "typeorm";
import { Post } from "../entities/post.entity";
import { Topic } from "../entities/topic.entity";
import { TopicLike } from "../entities/topicLike.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class PostRepository {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) {}

    async createPost(postDto: PostDto, image: string, user: User) {
        const post = new Post();

        console.log(postDto, user);
        post.title = postDto.title;
        post.content = postDto.content;
        post.school_id = postDto.school_id;
        post.topic_id = postDto.topic_id;
        post.image = image;
        post.user_id = user.id;
        
        const newPost = await this.postRepository.save(post);
        
        return newPost;
    };

    async getOnePost(post_id: number) {
        return await this.postRepository.createQueryBuilder('post')
            .select('post.title')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('user.name')
            .addSelect('school.name')
            .addSelect('topic.name')
            .addSelect('post.createdAt')
            .innerJoin('post.user', 'user')
            .innerJoin('post.topic', 'topic')
            .innerJoin('post.school', 'school')
            .where('post.id = :post_id', { post_id })
            .getOne();
    }

    async getAllPost() {
        return this.postRepository.createQueryBuilder('post')
            .select('post.title')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('user.name')
            .addSelect('school.name')
            .addSelect('topic.name')
            .addSelect('post.createdAt')
            .innerJoin('post.user', 'user')
            .innerJoin('post.topic', 'topic')
            .innerJoin('post.school', 'school')
            .getMany();
    }

    async deletePost(post_id: number) {
        return this.postRepository.createQueryBuilder('post')
            .delete()
            .from(Post)
            .where('id = :post_id', { post_id })
            .execute()
    }

    async checkUserbyWriter(post_id: number, user: User): Promise<boolean>{
        const writer = (await this.getOnePost(post_id)).user_id;
        if(writer == user.id) return true; 
        return false;
    }

    async updatePost(post_id: number, updatePostDto: UpdatePostDto) {
        return this.postRepository.createQueryBuilder('post')
            .update(Post)
            .set({  title: updatePostDto.title,
                    content: updatePostDto.content,
                })
            .where('id = :post_id', { post_id })
            .execute();
    }

    async searchPost(searchWord: string) {
        return this.postRepository.createQueryBuilder('post')
            .select('post.title')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('user.name')
            .addSelect('school.name')
            .addSelect('topic.name')
            .addSelect('post.createdAt')
            .innerJoin('post.user', 'user')
            .innerJoin('post.topic', 'topic')
            .innerJoin('post.school', 'school')
            .where('post.title like :title OR post.content like :content', {
                title: `%${searchWord}%`,
                content: `%${searchWord}%`
            })
            .getMany();
    }

    async getTopicLike(topic_id: number) {
        return this.postRepository.createQueryBuilder('post')
            .select('post.id')
            .addSelect('post.title')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('user.name')
            .addSelect('topic.name')
            .addSelect('post.createdAt')
            .innerJoin('post.user', 'user')
            .innerJoin('post.topic', 'topic')
            .where('post.topic_id = :topic_id', { topic_id })
            .getMany();
    }

    async reportPost(post_id: number) {
        return this.postRepository.createQueryBuilder('post')
            .update(Post)
            .set({ reports: () => 'reports + 1' })
            .where('id = :post_id', { post_id })
            .execute()
    }

    async reportCheck(post_id:number) {
        return this.postRepository.createQueryBuilder('post')
            .select('post.reports')
            .where('id = :post_id', { post_id })
            .getOne()
    }

}