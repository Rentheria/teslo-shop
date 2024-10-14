import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetRowHeaders, GetUser, RoleProtected } from './decorators';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';
import { UserRoleGuard } from './guards/user-role.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  // @Req() request: Express.Request
  testtingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @GetRowHeaders() rawheaders: string[],
  ) {
    return {
      ok: true,
      message: 'Que 11 con el 12',
      user,
      userEmail,
      rawheaders,
    };
  }

  @Get('private2')
  // @SetMetadata('roles', ['admin', 'super-user']) insted of this
  @RoleProtected(ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @Auth()
  // @Auth(ValidRoles.admin)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
