import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicLike } from 'src/shared/entities/topicLike.entity';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { TopicLikeRepository } from 'src/shared/repositories/topic-like.repository';
import { Post } from '../shared/entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [TypeOrmModule.forFeature([Post, TopicLike])],
    providers: [PostService, PostRepository, TopicLikeRepository],
    controllers: [PostController]
})
export class PostModule {}
