import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../model/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction) private readonly repo: Repository<Transaction>) { }

    public async getAll() {
        return await this.repo.find();
    }
}