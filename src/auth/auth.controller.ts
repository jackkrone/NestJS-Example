import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './DTOs/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  // Add service to the controller
  constructor(private authService: AuthService) {}

  // create user endpoint
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
