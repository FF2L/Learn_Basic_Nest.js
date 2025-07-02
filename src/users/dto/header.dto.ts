import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class HeaderDto{
    @IsString({message: 'access-token bị thiếu và phải là string'})
    @Expose({name: 'access-token'}) // expose để xác định tên của trường trong header
    accessToken: string
}