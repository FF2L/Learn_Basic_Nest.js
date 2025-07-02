import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {} // PartialType sẽ tạo ra một class mới có các thuộc tính của CreateUserDto nhưng không bắt buộc phải có giá trị, tức là có thể để trống
