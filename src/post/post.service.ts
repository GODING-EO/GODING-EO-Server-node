import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { ForbiddenError, NotFoundError } from 'src/shared/exception';
import { CommentRepository } from 'src/shared/repositories/comment.repository';
import { PostLikeRepository } from 'src/shared/repositories/post-like.repository';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { SchoolLikeRepository } from 'src/shared/repositories/school-like.repository';
import { TopicLikeRepository } from 'src/shared/repositories/topic-like.repository';
import { PostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly topicLikeRepository: TopicLikeRepository,
        private readonly schoolLikeRepository: SchoolLikeRepository,
        private readonly commentRepository: CommentRepository,
        private readonly postLikeRepository: PostLikeRepository
    ) {}

    public async createPost(postDto: PostDto, image: string, user: User) {
        return await this.postRepository.createPost(postDto, image, user);
    }

    public async getOnePost(post_id: number) {
        const post = await this.postRepository.getOnePost(post_id);
        if(!post) throw new NotFoundError;
        else return post;
    }

    public async getAllPost() {
       return await this.postRepository.getAllPost();
    }
    
    public async getMyPost(user: User) {
        return await this.postRepository.getMyPost(user);
    }

    public async deletePost(post_id: number, user: User) {
        if(!await this.postRepository.getOnePost(post_id)) {
            throw  new NotFoundError;
        } else if(await this.postRepository.checkUserbyWriter(post_id, user) == true){
            return await this.postRepository.deletePost(post_id);
        } throw new ForbiddenError;
    }

    public async updatePost(post_id: number, user: User, updatePostDto: UpdatePostDto) {
        if(!await this.postRepository.getOnePost(post_id)) {
            throw new NotFoundError;
        } else if(await this.postRepository.checkUserbyWriter(post_id, user) == true){
            return await this.postRepository.updatePost(post_id, updatePostDto);
        } throw new ForbiddenError;
    }

    public async searchPost(searchWord: string) {
        return await this.postRepository.searchPost(searchWord);
    }

    public async getPostOfLikeTopic(user: User) {
        var postsArray = new Array();
        const likeTopic = await this.topicLikeRepository.getLikeTopic(user);
        if(likeTopic.length == 0) return null;
        for(var i = 0; i < likeTopic.length; i++) {
            postsArray.push(await this.postRepository.getPostOfLikeTopic(likeTopic[i].topic_id));
        } return postsArray;
    }

    public async getPostOfLikeSchool(user: User) {
        var postsArray = new Array();
        const likeSchool = await this.schoolLikeRepository.getLikeSchool(user);
        console.log(likeSchool);
        if(likeSchool.length == 0) return null;
        for(var i = 0; i < likeSchool.length; i++) {
            postsArray.push(await this.postRepository.getPostOfLikeSchool(likeSchool[i].school_id));
        } return postsArray;
    }

    public async reportPost(post_id: number) {
        if(await this.postRepository.getOnePost(post_id))
        {
            await this.postRepository.reportPost(post_id);
            if(((await this.postRepository.reportCheck(post_id)).reports) >= 3) {
                this.postLikeRepository.deleteAllLike(post_id);
                this.commentRepository.deleteAllComment(post_id);
                return this.postRepository.deletePost(post_id);
            } return;
        } else throw new NotFoundError;
    }
}
