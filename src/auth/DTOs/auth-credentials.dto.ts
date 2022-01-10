import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

// recall: the Dto is essentially just a typescript type, can be done with interface or class
export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) // This requires password to match a regular expression
  password: string;
}
