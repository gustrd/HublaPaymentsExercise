import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from '../dto/transaction.dto';
import { SellerBalanceDTO } from '../dto/sellerBalance.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiParam, ApiTags } from '@nestjs/swagger';


@Controller('transaction')
export class TransactionController {
    constructor(private serv: TransactionService) { }

    @Get()
    @ApiTags('Recover all transactions at the database.')
    @ApiParam({name: 'none', description: 'no parameter required'})
    public async getAll(): Promise<TransactionDTO[]> {
        return await this.serv.getAll()
    }

    @Get("sellerBalance")
    @ApiTags('Recover the balance of all sellers at the database.')
    @ApiParam({name: 'none', description: 'no parameter required'})
    public async getAllSellerBalance(): Promise<SellerBalanceDTO[]> {
        return await this.serv.getAllSellerBalance()
    }

    @Post()
    @ApiTags('Manually inserts a new transaction.')
    @ApiParam({name: 'id', description: 'uuid4'})
    @ApiParam({name: 'transactionType', description: 'integer, can be 1,2, 3 or 4'})
    @ApiParam({name: 'transactionValue', description: 'decimal at format: 100.0'})
    @ApiParam({name: 'sellerName', description: 'string'})
    @ApiParam({name: 'productDescription', description: 'string'})
    public async post( @Body() dto: TransactionDTO): Promise<TransactionDTO> {
        return this.serv.create(dto);
    }

    @Post('upload')
    @ApiTags('Upload a txt file with bulk transactions.')
    @ApiParam({name: 'file', description: 'txt file with the format described at instrucoes.md'})
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(@UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 10000 }),
            new FileTypeValidator({ fileType: 'text/plain' }),
          ],
        }),
        ) file: Express.Multer.File) {

        return this.serv.createBulkFromPlainFile(file.buffer.toString());
    }
}