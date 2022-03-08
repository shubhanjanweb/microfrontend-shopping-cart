import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/modules/shared/decorators/public.decorator';
import { UserService } from '../services/user.service';
import { UserDto } from './dto/user.dto';
import { UserReqDto } from './dto/user.req.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService,
  ) {
  }

  @Public()
  @Post('register')
  async register(@Body() user: UserDto) {
    return await this.userService.createUser(user);
  }

  //@UseGuards(JwtAuthGuard) not required as every request is globally authenticated
  @Get('profile')
  async getProfile(@Query() user: UserReqDto) {
    return await this.userService.getUserProfile(user);
  }

}
