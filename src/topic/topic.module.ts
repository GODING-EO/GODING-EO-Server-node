import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '../shared/entities/topic.entity';
import { TopicRepository } from 'src/shared/repositories/topic.repository';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
    imports: [TypeOrmModule.forFeature([Topic])],
    providers: [TopicService, TopicRepository],
    controllers: [TopicController],
})
export class TopicModule {}
