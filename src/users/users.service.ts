import { Injectable, NotFoundException, Scope, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/common/dto/pagination.dto';
import { DEFAULT_PAGE_LIMIT } from 'src/common/utils/pagelimit';

@Injectable(/*{scope: Scope.REQUEST}*/) // de963 mỗi request tạo một instance mới nếu ko thì sẽ dùng chung instance,
//  nếu có thay đổi sẽ không ảnh hưởng đến các request khác
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

   async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto) // tạo một user mới từ createUserDto nhưng không lưu vào database, mục đích là để beforeinsert dc chay
    return await this.userRepository.save(user); // lưu user vào database
  }

  async findAll(paination: Pagination) {
    return await this.userRepository.find({
      skip: paination.skip, //nếu skip ko có thì sẽ lấy từ dầu
      take: paination.limit ?? DEFAULT_PAGE_LIMIT // nếu limit ko có thì lấy default page limit là 10
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id,}
    });
    if(!user) 
      throw new NotFoundException();
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({id}, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id);
  }

  async timTheoEmail(email: string) {
    return await this.userRepository.findOne({
      where: {email}
    })

  }
}