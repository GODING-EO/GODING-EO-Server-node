import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/shared/entities/post.entity';
import { PostLike } from 'src/shared/entities/postLike.entity';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { PostLikeRepository } from 'src/shared/repositories/postLike.repository';
import { PostLikeController } from './post-like.controller';
import { PostLikeService } from './post-like.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostLike, Post])],
    providers: [PostLikeService, PostLikeRepository, PostRepository],
    controllers: [PostLikeController]
})
export class PostLikeModule {}
