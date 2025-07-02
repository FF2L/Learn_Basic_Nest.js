import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

export const RequesHeader = createParamDecorator(async (targetDto:any, ctx: ExecutionContext)=>{
    const header = ctx.switchToHttp().getRequest().headers; // lấy header từ request
    const dto = plainToInstance(targetDto, header,{ // hàm tạo một instance của dto từ header truyền vào dto muốn chuyển và đối tượng cần chuyển
        excludeExtraneousValues: true, // loại bỏ các trường không có trong dto
    })
    try{
        await validateOrReject(dto) // kiểm tra dto có hợp lệ hay không, nếu không hợp lệ sẽ ném ra lỗi
    } catch (error) {
        throw new BadRequestException(error);
    } 
        return dto;
    

})