import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class LoginUserDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  account: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;


  @ApiProperty()
  @IsNotEmpty()
  isRegister: boolean

}