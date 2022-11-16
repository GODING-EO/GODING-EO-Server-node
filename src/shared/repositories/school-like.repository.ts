import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SchoolLike } from "../entities/schoolLike.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class SchoolLikeRepository {
    constructor(
        @InjectRepository(SchoolLike)
        private readonly schoolLikeRepository: Repository<SchoolLike>
    ) {}

    async addSchoolLike(school_id: number, user: User) {
        const schoollike = new SchoolLike();

        schoollike.school_id = school_id;
        schoollike.user_id = user.id;

        return await this.schoolLikeRepository.save(schoollike);
    }
    
    async cancelSchoolLike(school_id: number, user: User) {
        return await this.schoolLikeRepository.createQueryBuilder('school_like')
            .delete()
            .from (SchoolLike)
            .where('school_id = :school_id AND user_id = :user_id', {
                school_id,
                user_id: user.id
            })
            .execute()
    }

    async checkLike(school_id: number, user: User) {
        return this.schoolLikeRepository.createQueryBuilder('school_like')
            .select('school_like.school_id')
            .addSelect('school_like.user_id')
            .where('school_like.school.id = :school_id AND school_like.user_id = :user_id', {
                school_id,
                user_id: user.id
            })
            .getOne()
    }

    async getLikeSchool(user: User) {
        return this.schoolLikeRepository.createQueryBuilder('school_like')
            .select('school_like.school_id')
            .where('school_like.user_id = :user_id', { user_id : user.id })
            .getMany()
    }
}