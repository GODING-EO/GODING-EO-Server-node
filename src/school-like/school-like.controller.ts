import { Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/shared/entities/user.entity';
import { SchoolLikeService } from './school-like.service';

@Controller('school')
export class SchoolLikeController {
    constructor(private readonly schoolLikeService: SchoolLikeService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/:school_id/like')
    public async addSchoolLike(
        @Param('school_id') school_id: number,
        @Req() req: Request
    ) {
        const boolean = await this.schoolLikeService.SchoolLike(
            school_id,
            req.user as User
        );
        if(boolean == true) return { statusCode: 201, message: 'schoolLike success' };
        else if(boolean == false) return { statusCode: 200, message: 'Cancel schoolLike success' };
    }
}
