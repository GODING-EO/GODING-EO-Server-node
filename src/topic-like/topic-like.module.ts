import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/shared/entities/topic.entity';
import { TopicLike } from 'src/shared/entities/topicLike.entity';
import { TopicLikeRepository } from 'src/shared/repositories/topic-like.repository';
import { TopicRepository } from 'src/shared/repositories/topic.repository';
import { TopicLikeController } from './topic-like.controller';
import { TopicLikeService } from './topic-like.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopicLike, Topic])],
  providers: [TopicLikeService, TopicLikeRepository, TopicRepository],
  controllers: [TopicLikeController]
})
export class TopicLikeModule {}
