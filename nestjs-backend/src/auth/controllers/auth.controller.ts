import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

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

  // @Post('/signin')
  // signIn(
  //   @Body() authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.signIn(authCredentialsDto);
  // }

  @Get('/getuser')
  @UseGuards(AuthGuard())
  getUser(@Req() request: Request): Promise<any> {
    return this.authService.getUser(request);
  }

  // @Post('/refresh')
  // refreshToken(
  //   @Body() authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ refreshToken: string }> {
  //   return this.authService.refresh(authCredentialsDto);
  // }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  logOut(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Req() response: Response,
  ): Promise<{ message: string }> {
    // ): Promise<{ message: string }> {
    return this.authService.logOut(authCredentialsDto, response);
    // console.log('logged out');
    // return { message: 'User is successfully logged out' };
  }
}
