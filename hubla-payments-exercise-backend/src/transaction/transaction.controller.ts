import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private serv: TransactionService) { }

    @Get()
    public async getAll() {
        return await this.serv.getAll();
    }
}