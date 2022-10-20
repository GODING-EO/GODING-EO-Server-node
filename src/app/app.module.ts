import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { PostModule } from 'src/board/post/post.module';
import { SchoolModule } from '../school/school.module';
import { config } from '../config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, PostModule, SchoolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
