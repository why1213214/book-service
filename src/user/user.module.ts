import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/user/jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'dasdjanksjdasd', // 密钥
      signOptions: { expiresIn: '1h' }, // token 过期时效
    }),
  ],
  controllers: [
    UserController
  ],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule { }