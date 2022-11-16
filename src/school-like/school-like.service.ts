import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { BadRequestError } from 'src/shared/exception';
import { SchoolLikeRepository } from 'src/shared/repositories/school-like.repository';

@Injectable()
export class SchoolLikeService {
    constructor(
        private readonly schoolLikeRepository: SchoolLikeRepository,
    ) {}

    public async addSchoolLike(school_id: number, user: User) {
        console.log(user);
        const like = await this.schoolLikeRepository.checkLike(school_id, user);
        if(!like) return await this.schoolLikeRepository.addSchoolLike(school_id, user);
        throw new BadRequestError(`already done`);
    }

    public async cancelSchoolLike(school_id: number, user: User) {
        const like = await this.schoolLikeRepository.checkLike(school_id, user);
        if(like) return await this.schoolLikeRepository.cancelSchoolLike(school_id, user);
        throw new BadRequestError(`already done`);
    }
}
