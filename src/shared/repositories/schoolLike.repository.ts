import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SchoolLike } from "../entities/schoolLike.entity";

@Injectable()
export class SchoolLikeRepository {
    constructor(
        @InjectRepository(SchoolLike)
        private readonly schoolLikeRepository: Repository<SchoolLike>
    ) {}
}