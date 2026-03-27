import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: any) {
    const { email, password, firstName, lastName, phone, address } = body;
    return this.authService.signUp(email, password, {
      first_name: firstName,
      last_name: lastName,
      phone,
      address,
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const { email, password } = body;
    return this.authService.signIn(email, password);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return this.authService.signOut();
  }
}
