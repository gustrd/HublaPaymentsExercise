import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsDateString } from 'class-validator';
import { Transaction } from '../model/transaction.entity';
import { v4 as uuidv4 } from 'uuid';

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

  public static parseTransaction(input : string) : TransactionDTO[] 
  {
    const lines = input.trim().split("\n");
    const dtos: TransactionDTO[] = [];

    for (const line of lines) 
    {
        try 
        {
            const transactionType = parseInt(line.substring(0,1).trim());
            const transactionDate = new Date(line.substring(1, 26).trim());
            const productDescription = line.substring(26, 56).trim();
            const transactionValue = parseInt(line.substring(56, 66).trim())/100;  //Adjusts the cents
            const sellerName = line.substring(66, 86).trim();

            if (!isFinite(transactionDate.getTime())
                || transactionType.toString() === "NaN"
                || transactionValue.toString() === "NaN")
              throw new DOMException();

            const dto = new TransactionDTO();
            dto.id = uuidv4();
            dto.transactionType = transactionType;
            dto.transactionDate = transactionDate; 
            dto.productDescription = productDescription;
            dto.transactionValue = transactionValue;
            dto.sellerName = sellerName;

            dtos.push(dto);
        } 
        catch (error) { 
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'The file format is not valid.',
            }, HttpStatus.FORBIDDEN, {
            cause: error
            });
        }
    }
  
    return dtos;
  }
}