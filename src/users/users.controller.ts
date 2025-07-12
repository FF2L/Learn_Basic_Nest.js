import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put, ParseIntPipe, Headers, Query, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {idDto} from './dto/id.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { HeaderDto } from './dto/header.dto';
import { RequesHeader } from './pipes/requestHeader';
import { Pagination } from 'src/common/dto/pagination.dto';
import { AuthJwtGuard } from 'src/auth/guard/auth-jwt/auth-jwt.guard';
//Lưu ý phải để /đường dẫn trc các params trong nestjs controler ko thì lỗi 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // readonly là không cho phép thay đổi giá trị hay state của biến này sau khi dc khởi tạo

  @Post()
  @UsePipes(new ValidationPipe({ groups: ['create']}))
  //sử dụn pipe để ép body phải đúng theo dto,ValidationPipe là phải đúng prop trong dto
  //whitelist:true sẽ loại bỏ các prop không có trong dto
  //forbidNonWhitelisted:true sẽ trả về lỗi nếu có prop không có trong dto
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Put(':id')
  // @UsePipes(new ValidationPipe({ groups:['update']}))
  // updateUser(@Param('id') id:string, @Body() body: CreateUserDto){
  //   return {id, ...body}
  // }

  @Put(':id')
  updateUser(@Param('id',ParseIdPipe) id:number, @Body() body: UpdateUserDto){
    return this.usersService.update(id,body)
  }

  @Get()
  findAll(@Query() pagination: Pagination) {
    return this.usersService.findAll(pagination);
  }

 @UseGuards(AuthJwtGuard)
  @Get('profiled')
  findProfiled(@Req() req){
    console.log('hello')
    return this.usersService.findProfile(req.user.userId)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { // ParseIntPipe sẽ tự động chuyển đổi id sang số nguyên, nếu không phải số nguyên sẽ trả về lỗi
    return this.usersService.findOne(+id);
  }

 



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id/:abc')
  remove(@Param() params: {id: idDto, abc: string} ){ //nếu sử dụng idDto phải có tranfsform trong ValidationPipe và //enableImplicitConversion: true trong transformOptions và phải để params trống
    console.log(params.id, params.abc);
    return {msg: 'daxoa thanh cong'}
  }
  @Delete(':id')
  xoaTheoIdVaSuDungcustompipe(@Param('id',ParseIdPipe) param:number){ //sử dụng custom pipe để kiểm tra id phải truyền vào param tham số
    return this.usersService.remove(param);
  }
  // @Get(':name')
  // capNhatTheoName(@Param() param, @RequesHeader(HeaderDto) header: HeaderDto){ //custom anotation để lấy header từ request và chuyển đổi sang dto 
  //   return header
  // }
}
