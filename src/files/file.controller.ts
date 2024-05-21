import { Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileService } from './file.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileStorage } from './storage'

@Controller('files')
@ApiTags('files')
export class FileController {
	constructor(private readonly fileService: FileService) {
	}

	@Post()
	@UseInterceptors(FileInterceptor('file', {
			storage: fileStorage
		})
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema : {
			type: 'object',
			properties: {
					file : {
						type :'string',
						format: 'binary',
					}
			}
		}
	})
	create(@UploadedFile(
		new ParseFilePipe({
			validators:[new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5 })]
		})
	) file: Express.Multer.File) {
		return file
	}


}
