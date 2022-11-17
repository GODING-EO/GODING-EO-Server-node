import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from '../shared/entities/school.entity';

@Module({
    imports: [TypeOrmModule.forFeature([School])]
})
export class SchoolModule {}