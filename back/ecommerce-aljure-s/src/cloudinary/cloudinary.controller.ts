import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';


@ApiTags('Cloudinary files loader')
@Controller('files')
export class CloudinaryController {
    constructor(
        private readonly cloudinaryService: CloudinaryService
    ) {} 

    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @Param('id') productID: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 250000,
                        message: 'The file is too large',
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp|gif|svg)/,
                    })
                ]
            })
        ) file: Express.Multer.File // tipo de tapo "type": ["multer"]
    ){
        return await this.cloudinaryService.uploadImage(file, productID)
    }

}
