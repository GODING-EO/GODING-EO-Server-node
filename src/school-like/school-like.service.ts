import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { BadRequestError, ConflictError } from 'src/shared/exception';
import { SchoolLikeRepository } from 'src/shared/repositories/school-like.repository';

@Injectable()
export class SchoolLikeService {
    constructor(
        private readonly schoolLikeRepository: SchoolLikeRepository,
    ) {}

    public async SchoolLike(school_id: number, user: User): Promise<boolean>{
        const like = await this.schoolLikeRepository.checkLike(school_id, user);
        if(!like) {
            await this.schoolLikeRepository.addSchoolLike(school_id, user);
            return true;
        }
        else if(like) {
            await this.schoolLikeRepository.cancelSchoolLike(school_id, user);
            return false;
        }
    }
}
