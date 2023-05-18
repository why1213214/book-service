import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './user.dto';
@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Get('/j8')
  getProjectName(): string {
    return '贼j8牛逼的项目'
  }

  @Post('/login')
  async login(@Body() user: LoginUserDto): Promise<boolean> {
    return await this.userService.inspectLogin(user)
  }
}
