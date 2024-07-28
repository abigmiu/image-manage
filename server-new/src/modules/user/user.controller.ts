import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequestDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: RegisterRequestDto) {
    return this.userService.register(dto);
  }
}
