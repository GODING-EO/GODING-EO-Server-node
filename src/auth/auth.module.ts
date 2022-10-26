import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { JwtStrategy } from 'src/shared/jwt/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
    imports: [ 
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_KEY
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
