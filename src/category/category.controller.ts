import { Controller, Get } from '@nestjs/common';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {

    constructor (
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    async findAllCategories(): Promise<ReturnCategoryDto[]> {
        return (await this.categoryService.findAllCategories()).map((category) => new ReturnCategoryDto(category))
    }
}
