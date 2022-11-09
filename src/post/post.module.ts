import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/shared/entities/comment.entity';
import { PostLike } from 'src/shared/entities/postLike.entity';
import { TopicLike } from 'src/shared/entities/topicLike.entity';
import { CommentRepository } from 'src/shared/repositories/comment.repository';
import { PostLikeRepository } from 'src/shared/repositories/post-like.repository';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { TopicLikeRepository } from 'src/shared/repositories/topic-like.repository';
import { multerOptionsFactory } from 'src/shared/repositories/upload.repository';
import { Post } from '../shared/entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post, TopicLike, Comment, PostLike]),
        MulterModule.registerAsync({
            useFactory: multerOptionsFactory,
        }),
    ],
    providers: [PostService, PostRepository, TopicLikeRepository, CommentRepository, PostLikeRepository],
    controllers: [PostController]
})
export class PostModule {}
