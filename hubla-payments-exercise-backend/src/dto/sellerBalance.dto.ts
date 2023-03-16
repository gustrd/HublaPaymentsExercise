import { ApiProperty } from '@nestjs/swagger';
import { from } from "linq-to-typescript";
import { IsString, IsNumber } from 'class-validator';
import { TransactionDTO } from './transaction.dto';

export class SellerBalanceDTO implements Readonly<SellerBalanceDTO> 
{
  @ApiProperty({ required: true })
  @IsString()
  sellerName: string;

  @ApiProperty({ required: true })
  @IsNumber()
  balanceValue: number;

  //TODO: configurations from the object definition in file "instruction.md"
  //   with the 3 and 4 transactionTypes inverted. Here is the solution that allows the current data to be correct
  //   it's needed to align with the .txt generation team to agree at the final definition. 
  public static positiveTransactionTypes: number[] = [1,2,3];
  public static negativeTransactionTypes: number[] = [4];

  constructor(sellerName: string, balanceValue: number){
    this.sellerName = sellerName;
    this.balanceValue = balanceValue;
  }

  public static TransformTransactionListToSellerBalanceDTO (transactionDtoArray : Array<TransactionDTO>)
  {
    //Create return object
    const sellerBalanceDtoList = new Array<SellerBalanceDTO>();

    //Get the sellerName list
    const sellerNameList = from(transactionDtoArray)
                            .select(t => t.sellerName)
                            .distinct();

    for (const sellerName of sellerNameList)
    {
        const sellerTransactionsList = from(transactionDtoArray)
                                        .where(t => t.sellerName === sellerName);

        const positiveTransactionsBalance = from(sellerTransactionsList)
                                        .where(t => SellerBalanceDTO.positiveTransactionTypes.includes(t.transactionType) )
                                        .select(t => t.transactionValue)
                                        .sum();

        const negativeTransactionsBalance = from(sellerTransactionsList)
                                        .where(t => SellerBalanceDTO.negativeTransactionTypes.includes(t.transactionType) )
                                        .select(t => t.transactionValue)
                                        .sum();

        sellerBalanceDtoList.push(
            new SellerBalanceDTO(
                sellerName,
                positiveTransactionsBalance - negativeTransactionsBalance,
            )
        )
    }

    return sellerBalanceDtoList;
  }


}
