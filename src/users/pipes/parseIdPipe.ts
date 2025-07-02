import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable() // Injectable để có thể sử dụng ngoài module này
 export class ParseIdPipe implements PipeTransform <string,number>{
    transform(value: any, metadata: ArgumentMetadata): number {
        const val = parseInt(value,10);
        if(isNaN(val))
            throw new BadRequestException('id phải là số');
        if(val<=0)
            throw new BadRequestException('id phải là số dương');
        return val;

        
    }
 }