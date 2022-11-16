import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolLike } from 'src/shared/entities/schoolLike.entity';
import { SchoolLikeRepository } from 'src/shared/repositories/school-like.repository';
import { SchoolLikeController } from './school-like.controller';
import { SchoolLikeService } from './school-like.service';

@Module({
    imports: [TypeOrmModule.forFeature([SchoolLike])],
    providers: [SchoolLikeService, SchoolLikeRepository],
    controllers: [SchoolLikeController]
})
export class SchoolLikeModule {}
