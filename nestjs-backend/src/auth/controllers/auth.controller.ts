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
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ message: string }> {
    return this.authService.signUp(authCredentialsDto);
  }

  //spremamo token u cookie
  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response, //čemu služi passthrough? -> "because we want the cookie, to send it to the frontend"
  ): Promise<void> {
    const returned = await this.authService.signIn(authCredentialsDto);
    response.cookie('jwt-accessToken', returned.accessToken);
    // response.cookie('jwt-accessToken', returned.accessToken, {
    //   httpOnly: true,
    // });
  }

  // @Post('/signin')
  // signIn(
  //   @Body() authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.signIn(authCredentialsDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/test') // služi testiranju kako poslati token unutar authorization headera
  test(): string {
    return 'test successful';
  }

  @Get('/getuser')
  @UseGuards(AuthGuard()) // zaš ovo nije JwtAuthGuard?
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
  // @UseGuards(JwtAuthGuard)
  logout(@Res() response: Response): Promise<{ message: string }> {
    // return { message: 'heelo' };
    console.log('is there anybody out there?');
    return this.authService.logout(response);
  }

  // @Post('/logout')
  // @UseGuards(JwtAuthGuard)
  // logOut(
  //   @Body() authCredentialsDto: AuthCredentialsDto,
  //   @Res() response: Response, //RES BRIJEM????
  // ): Promise<{ message: string }> {
  //   return this.authService.logout(authCredentialsDto, response);
  //   // console.log('logged out');
  //   // return { message: 'User is successfully logged out' };
  // }
}
