import { Body, Controller, Post, Get, Res, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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

  @Get('/getuser')
  getUser(@Req() request: Request): Promise<any> {
    return this.authService.getUser(request);
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
