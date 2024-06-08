import {Module} from "@nestjs/common";
import {FileController} from "./file.controller";
import { FileService } from './file.service'
import { PrismaService } from '../prisma.service'

@Module({
    controllers:[FileController],
    providers:[FileService]
})
export class FileModule {}