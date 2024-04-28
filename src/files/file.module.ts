import {Module} from "@nestjs/common";
import {FileController} from "./file.controller";

@Module({
    controllers:[FileController],
    imports:[],
    providers:[]
})
export class FileModule {}