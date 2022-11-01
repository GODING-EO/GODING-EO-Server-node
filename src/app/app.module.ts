import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { PostModule } from 'src/post/post.module';
import { SchoolModule } from '../school/school.module';
import { config } from '../config/ormconfig';
import { TopicModule } from 'src/topic/topic.module';
import { AuthModule } from 'src/auth/auth.module';
import { PostLikeModule } from 'src/post-like/post-like.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), 
    TopicModule, 
    UserModule, 
    PostModule, 
    SchoolModule,
    AuthModule,
    PostLikeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
