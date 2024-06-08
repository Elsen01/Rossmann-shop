import {
	Body,
	Controller, Delete,
	Get,
	HttpCode,
	Param, ParseIntPipe,
	Patch,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('profile')
	async getNewTokens(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Patch('profile/favorites/:productId')
	async toggleFavorite(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string
	) {
		return this.userService.toggleFavorite(id, +productId)
	}
	
	@Get()
	async getAllUser() {
		return this.userService.getAllUser()
	}

	@Get('/:id')
	@Auth()
	async findById(@Param('id',new ParseIntPipe() ) id: number) {
		return await this.userService.getById(id);
	}
	@Delete('/:id')
	@Auth()
	async deletedUser(@Param('id', new ParseIntPipe()) id: number) {
		return await this.userService.delete(id);
	}
}
