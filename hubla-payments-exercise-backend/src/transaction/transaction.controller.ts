import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from '../dto/transaction.dto';

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
}