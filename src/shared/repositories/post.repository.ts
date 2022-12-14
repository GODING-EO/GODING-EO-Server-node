import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostDto, UpdatePostDto } from "src/post/dto/post.dto";
import { Repository } from "typeorm";
import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class PostRepository {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) {}

    async createPost(postDto: PostDto, image: string, user: User) {
        const post = new Post();
        
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
            .addSelect('post.id')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('post.user_id')
            .addSelect('user.name')
            .addSelect('school.name')
            .addSelect('topic.name')
            .loadRelationCountAndMap('post.likeCount', 'post.postlike')
            .addSelect('post.createdAt')
            .addSelect('post.updatedAt')
            .innerJoin('post.user', 'user')
            .leftJoin('post.topic', 'topic')
            .leftJoin('post.school', 'school')
            .where('post.id = :post_id', { post_id })
            .getOne();
    }

    async getAllPost() {
        return this.postRepository.createQueryBuilder('post')
            .select('post.title')
            .addSelect('post.id')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('user.name')
            .addSelect('school.name')
            .addSelect('topic.name')
            .loadRelationCountAndMap('post.likeCount', 'post.postlike')
            .addSelect('post.createdAt')
            .addSelect('post.updatedAt')
            .innerJoin('post.user', 'user')
            .leftJoin('post.topic', 'topic')
            .leftJoin('post.school', 'school')
            .getMany();
    }

    async getMyPost(user: User) {
        return await this.postRepository.createQueryBuilder('post')
            .select('post.title')
            .addSelect('post.id')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('post.user_id')
            .addSelect('user.name')
            .addSelect('school.name')
            .addSelect('topic.name')
            .loadRelationCountAndMap('post.likeCount', 'post.postlike')
            .addSelect('post.createdAt')
            .addSelect('post.updatedAt')
            .innerJoin('post.user', 'user')
            .leftJoin('post.topic', 'topic')
            .leftJoin('post.school', 'school')
            .where('post.user_id = :user_id', { user_id: user.id })
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
            .addSelect('post.id')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('user.name')
            .addSelect('school.name')
            .addSelect('topic.name')
            .loadRelationCountAndMap('post.likeCount', 'post.postlike')
            .addSelect('post.createdAt')
            .addSelect('post.updatedAt')
            .innerJoin('post.user', 'user')
            .leftJoin('post.topic', 'topic')
            .leftJoin('post.school', 'school')
            .where('post.title like :title OR post.content like :content', {
                title: `%${searchWord}%`,
                content: `%${searchWord}%`
            })
            .getMany();
    }

    async getPostOfLikeTopic(topic_id: number) {
        return this.postRepository.createQueryBuilder('post')
            .select('post.id')
            .addSelect('post.title')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('user.name')
            .addSelect('topic.name')
            .loadRelationCountAndMap('post.likeCount', 'post.postlike')
            .addSelect('post.createdAt')
            .addSelect('post.updatedAt')
            .innerJoin('post.user', 'user')
            .leftJoin('post.topic', 'topic')
            .where('post.topic_id = :topic_id', { topic_id })
            .getMany();
    }

    async getPostOfLikeSchool(school_id: number) {
        return this.postRepository.createQueryBuilder('post')
            .select('post.id')
            .addSelect('post.title')
            .addSelect('post.content')
            .addSelect('post.image')
            .addSelect('user.name')
            .addSelect('school.name')
            .loadRelationCountAndMap('post.likeCount', 'post.postlike')
            .addSelect('post.createdAt')
            .addSelect('post.updatedAt')
            .innerJoin('post.user', 'user')
            .leftJoin('post.school', 'school')
            .where('post.school_id = :school_id', { school_id })
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