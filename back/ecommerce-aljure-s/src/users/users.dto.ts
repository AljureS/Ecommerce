import { ApiHideProperty, ApiProperty, PickType } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches, Validate } from "class-validator"
import { MatchingPassword } from "src/decorators/matchingPassword.decorator"
import { Orders } from "src/entities/orders.entity"
import { CreateOrderDto } from "src/orders/orders.dto"

export class createUserDto { 
    /**
    This is the name of the user 
    @example 'Cristiano'
     */
    @IsNotEmpty({message: 'Name required'})
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
    @IsString({ message: 'name must be a string' })
    name: string

    /**
     * This is the email of the user
     * @example 'X8l8C@example.com'
     */
    @IsEmail()
    @IsNotEmpty({message: 'Email required'})
    email: string

    /**
     * This is the password of the user
     * @example 'Password#123'
     */
    @IsString({ message: 'password must be a string' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*), and be between 8 and 15 characters long.',
    })
    password: string

    /**
     * This is the confirm password of the user
     * @example 'Password#123'
     */
    @IsNotEmpty({ message: 'Confirm password required' })
    @Validate(MatchingPassword, ['password'])
    confirmPassword: string

    /**
     * This is the address of the user
     * @example 'Calle 123'
     */
    @IsNotEmpty({message: 'Address required'})
    @Length(3, 80 )
    address: string

    /**
     * This is the phone of the user
     * @example '123456789'
     */
    @IsNumber()
    @IsNotEmpty({message: 'Phone required'})
    phone: number 

    /**
     * This is the country of the user
     * @example 'Colombia'
     */
    @IsNotEmpty({message: 'Country required'})
    @Length(5, 20)
    @IsString({ message: 'country must be a string' })
    country: string

    /**
     * This is the city of the user
     * @example 'Bogota'
     */
    @IsNotEmpty({message: 'City required'})
    @Length(5, 20)
    @IsString({ message: 'city must be a string' })
    city: string

    @ApiHideProperty()
    @IsEmpty()
    idAdmin?: boolean
}
