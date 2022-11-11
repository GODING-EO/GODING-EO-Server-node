import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/shared/entities/comment.entity';
import { Post } from 'src/shared/entities/post.entity';
import { CommentRepository } from 'src/shared/repositories/comment.repository';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post])],
  providers: [CommentService, CommentRepository, PostRepository],
  controllers: [CommentController]
})
export class CommentModule {}
