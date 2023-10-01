import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email?: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters 6 long'
	})
	@IsString()
	password: string
}
