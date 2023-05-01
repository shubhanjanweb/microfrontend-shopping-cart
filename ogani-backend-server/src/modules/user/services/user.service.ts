import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../controllers/dto/login.user.dto';
import { UserDto } from '../controllers/dto/user.dto';
import { UserReqDto } from '../controllers/dto/user.req.dto';
import { UserVo } from '../controllers/vo/user.vo';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {

  }
  async createUser(userData: UserDto): Promise<string> {
    const { userName, emailId } = userData;

    if (userName) {
      const id: Pick<UserEntity, 'id'> | undefined = await this.userRepository.findOne({
        where: { userName },
        select: ['id'],
      });
      if (id) {
        throw new HttpException(`${userName} already exsist`, HttpStatus.OK);
      }
    }
    if (emailId) {
      const id: Pick<UserEntity, 'id'> | undefined = await this.userRepository.findOne({
        where: { emailId },
        select: ['id'],
      });
      if (id) {
        throw new HttpException(`${emailId} already exsist`, HttpStatus.OK);
      }
    }
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userData.password, salt);
    await this.userRepository.save({ ...userData, password });
    return 'Successfully user created';
  }
  async getUserForLogin(userData: LoginUserDto): Promise<{ id, userName, fullName, photoUrl }> {
    const { userName, password } = userData;
    const user: UserEntity | undefined = await this.userRepository.findOne({
      where: { userName }
    });
    if (!user) {
      throw new BadRequestException(`${userName} doesn't exsist`);
    }
    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException(`${userName} and password do not match`);
    }
    const {
      id, fullName, photoUrl
    } = user
    return {
      id, userName, fullName, photoUrl
    };
  }
  async getUserProfile(userData: UserReqDto): Promise<UserVo> {
    const user: UserEntity | undefined = await this.userRepository.findOne({
      where: { id: parseInt(userData.id) },
      select: [
        'userName',
        'emailId',
        'fullName',
        'mobileNumber',
        'type',
        'photoUrl'
      ]
    });
    if (!user) {
      throw new BadRequestException(`User doesn't exsist`);
    }
    return user;
  }

  async count(): Promise<number> {
    return await this.userRepository.count();
  }
}
