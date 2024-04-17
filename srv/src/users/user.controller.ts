import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';
import { PaginationDto } from 'src/pagination/pagination.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query() paginationDto: PaginationDto) {
    this.logger.log('Get all users');
    const users = await this.userService.findAll(paginationDto);
    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }
}
