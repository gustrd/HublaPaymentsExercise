import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../model/transaction.entity';
import { TransactionDTO } from '../dto/transaction.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction) private readonly repo: Repository<Transaction>) { }

    public async getAll(): Promise<TransactionDTO[]> {
        return await this.repo.find()
            .then(items => items.map(e => TransactionDTO.fromEntity(e)));
    }
    
    public async create(dto: TransactionDTO): Promise<TransactionDTO> {
        return this.repo.save(dto.toEntity())
            .then(e => TransactionDTO.fromEntity(e));
    }
}