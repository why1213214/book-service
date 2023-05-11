import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Get('/j8')
  getProjectName(): string {
    return '贼j8牛逼的项目'
  }

}
