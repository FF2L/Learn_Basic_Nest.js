import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateUserProfileDto {
    @IsString()
    socialUrl: string
    @IsString()
    avatarUrL: string
    @IsDate()
    brithDay: Date
    @IsString()
    sex: string
    @IsNumber()
    userId: number // Thêm trường userId để liên kết với User
}
