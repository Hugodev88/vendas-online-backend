import { IsNumber, IsString } from "class-validator";

export class UpdateProductDto {

    @IsString()
    name: string;
    
    @IsNumber()
    price: number;
    
    @IsNumber()
    categoryId: number;
    
    @IsString()
    image: string;
    
}