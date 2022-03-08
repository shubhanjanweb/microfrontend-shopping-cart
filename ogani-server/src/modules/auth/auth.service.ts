import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserVo } from '../user/controllers/vo/user.vo';
import { UserService } from '../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {

  }

  async validateUser(userName: string, password: string): Promise<{ id, userName }> {
    return await this.userService.getUserForLogin({ userName, password });
  }

  async login(user: any) {
    const payload = { username: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
