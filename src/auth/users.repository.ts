import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './DTOs/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  // make a createUser method... makes sense to store this logic in the repository
  public async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    // extract username and password from Dto
    const { username, password } = authCredentialsDto;

    // create and save user
    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // 23505 is postgres' duplicate error code
        throw new ConflictException('Username already exists'); // This is a predefined error type
      } else {
        throw new InternalServerErrorException(); // not sure how this error is different than an uncaught error
      }
    }
  }
}
