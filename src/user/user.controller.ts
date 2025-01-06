import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService){}

    @UsePipes(ValidationPipe)

    @Post()
    async createUser( @Body() createUser: CreateUserDto): Promise<UserEntity>{
        return this.userService.createUser(createUser)
    }

    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]>{
        return (await this.userService.getAllUser()).map((UserEntity) => new ReturnUserDto(UserEntity))
    }

    // @Get('/:userId')    
    // async getUserById(@Param('userId') userId: number): Promise<UserEntity> {
    //     return this.userService.getUserByIdUsingRelations(userId)
    // }

    @Get('/:userId')    
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(userId))
    }

    @Patch()
    @UsePipes(ValidationPipe)
    async updatePasswordUser(@Body() updatePassword: UpdatePasswordDto, @UserId('userId') userId: number): Promise<UserEntity>{
        return this.userService.updatePasswordUser(updatePassword, userId);
    }
}
