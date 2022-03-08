import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStartegy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
    });// config
  }

  async validate(userName: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(userName, password);
    return user;
  }

}