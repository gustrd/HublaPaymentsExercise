import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../model/transaction.entity';
import { TransactionDTO } from '../dto/transaction.dto';
import { SellerBalanceDTO } from '../dto/sellerBalance.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction) private readonly repo: Repository<Transaction>) { }

    public async getAll(): Promise<TransactionDTO[]> {
        return await this.repo.find()
            .then(items => items.map(e => TransactionDTO.fromEntity(e)));
    }

    public async getAllSellerBalance(): Promise<SellerBalanceDTO[]> {
        return await this.repo.find()
            .then(items => SellerBalanceDTO.TransformTransactionListToSellerBalanceDTO(
                                items.map(e => TransactionDTO.fromEntity(e)
                                )
                            )
            );
    }
    
    public async create(dto: TransactionDTO): Promise<TransactionDTO> {
        return this.repo.save(dto.toEntity())
            .then(e => TransactionDTO.fromEntity(e));
    }

    public async createBulkFromPlainFile(inputString: string): Promise<string> {
        const dtos = TransactionDTO.parseTransaction(inputString);
        let insertCounter = 0;

        for (const dto of dtos)
        {
            this.repo.save(dto.toEntity());
            insertCounter++;
        }

        return "Inserted " + insertCounter + " new product transactions.";
    }
}