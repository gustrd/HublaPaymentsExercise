import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsDateString } from 'class-validator';
import { Transaction } from '../model/transaction.entity';

export class TransactionDTO implements Readonly<TransactionDTO> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsNumber()
  transactionType: number;

  @ApiProperty({ required: true })
  @IsDateString()
  transactionDate: Date;

  @ApiProperty({ required: true })
  @IsString()
  productDescription: string;

  @ApiProperty({ required: true })
  @IsNumber()
  transactionValue: number;

  @ApiProperty({ required: true })
  @IsString()
  sellerName: string;


  public static from(dto: Partial<TransactionDTO>) {
    const it = new TransactionDTO();
    it.id = dto.id;
    it.transactionType = dto.transactionType;
    it.transactionDate = dto.transactionDate;
    it.productDescription = dto.productDescription;
    it.transactionValue = dto.transactionValue;
    it.sellerName = dto.sellerName;
    return it;
  }

  public static fromEntity(entity: Transaction) {
    return this.from({
      id: entity.id,
      transactionType: entity.transactionType,
      transactionDate: entity.transactionDate,
      productDescription: entity.productDescription,
      transactionValue: entity.transactionValue,
      sellerName: entity.sellerName
    });
  }

  public toEntity() {
    const it = new Transaction();
    it.id = this.id;
    it.transactionType = this.transactionType;
    it.transactionDate = this.transactionDate;
    it.productDescription = this.productDescription;
    it.transactionValue = this.transactionValue;
    it.sellerName = this.sellerName;

    return it;
  }
}