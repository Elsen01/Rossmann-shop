import {Controller} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {FileService} from "./file.service";

@Controller('files')
@ApiTags('files')
export class FileController {
    constructor(private readonly  fileService: FileService) {}

}
