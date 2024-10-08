import { Repository } from 'typeorm';

import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive, talks with an admin');
    }

    return user;
  }
}
