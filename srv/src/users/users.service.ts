import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/constants/common.constants';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users
  async findAll(paginationDto: PaginationDto): Promise<UsersEntity[]> {
    const { limit, offset } = paginationDto;

    return await this.usersRepo.find({
      skip: offset,
      take: limit ?? DEFAULT_PAGE_SIZE.USER,
    });
  }
}
