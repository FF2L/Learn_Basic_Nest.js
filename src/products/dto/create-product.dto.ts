import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name:string;
    @IsString()
    type:string;
    @IsString()
    price:number;
    @IsNumber()
    userId:number;
}
