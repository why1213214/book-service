import { In, Like, Raw, Repository, MongoRepository } from 'typeorm';
import { Injectable, Inject, Post, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { LoginUserDto } from './user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}
  
  async register(
    registerDTO: LoginUserDto
  ): Promise<any> {

    const { password } = registerDTO;
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt);  // 加密密码

    const newUser: UserEntity = new UserEntity()
    newUser.password = hashPassword
    newUser.salt = salt
    return await this.userRepository.save(newUser)
  }


  async inspectLogin(userDto: LoginUserDto) {
    const { account, isRegister } = userDto
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.account = :account', { account })
      .getOne()
    // 未注册或账号输入错误
    if (!user) {

      // 用户确认注册
      if (isRegister) {
        return this.register(userDto)
      }
      return {
        code: 10001,
        message: 'lll'
      }
    }
    // 已注册 直接登录
    return this.login(user, userDto)

  }

  async login(user: UserEntity, userDto: LoginUserDto) {
    const { password: dbPassword, salt } = user
    const { password } = userDto
    const currentHashPassword = encryptPassword(password, salt)
    if (dbPassword !== currentHashPassword) {
      throw new BusinessException('密码输入错误')
    };
    return this.certificate(user)
  }

// 生成 token
  async certificate(user: UserEntity) {
    const payload = {
      id: user.id,
      account: user.account,
      password: user.password,
    };
    const token = this.jwtService.sign(payload);
    return token
  }
}