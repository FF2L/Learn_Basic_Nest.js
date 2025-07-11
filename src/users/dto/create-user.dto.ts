import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateUserDto {
    @IsString({always:true}) // mọi group đều có trường này
    @IsNotEmpty()
    name: string;
    @IsEmail({},{groups: ['create']})// chỉ bát buộc khi nó nàm trong group create
    @IsNotEmpty() 
    @IsOptional({groups: ['update']}) // không bắt buộc khi nó nằm trong group update 
    email: string;
    @IsInt({always: true})
    @IsPositive() //số dương
    age: number;

    @IsString()
    @IsNotEmpty()
    password:string
}
