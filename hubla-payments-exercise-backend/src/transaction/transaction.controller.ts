import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from '../dto/transaction.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('transaction')
export class TransactionController {
    constructor(private serv: TransactionService) { }

    @Get()
    public async getAll(): Promise<TransactionDTO[]> {
        return await this.serv.getAll()
    }

    @Post()
    public async post( @Body() dto: TransactionDTO): Promise<TransactionDTO> {
        return this.serv.create(dto);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(@UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 10000 }),
            new FileTypeValidator({ fileType: 'text/plain' }),
          ],
        }),
        ) file: Express.Multer.File) {

        //TODO: Create real service
        return this.serv.createBulkFromPlainFile(file.buffer.toString());
    }
}