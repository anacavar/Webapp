import { Body, Controller, Post, Get, Res, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService, // ovo prebaci kasnije u servis
  ) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    return this.authService.signIn(authCredentialsDto, response);
  }

  @Get('/getuser') // prebaci kasnije u servis
  async getUser(@Req() request: Request) {
    const cookie = request.cookies['jwt-accessToken'];
    const data = await this.jwtService.verifyAsync(cookie);
    return data;
  }

  // @Post('/refresh')
  // refreshToken(
  //   @Body() authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ refreshToken: string }> {
  //   return this.authService.refresh(authCredentialsDto);
  // }

  // @Post('/logout')
  // logOut(
  //   @Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //     return this.authService.logOut(authCredentialsDto);
  //   }
  // )
}
