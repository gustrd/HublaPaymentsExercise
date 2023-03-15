import { TransactionService } from './transaction.service';
import { TransactionDTO } from '../dto/transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from '../model/transaction.entity';
import { v4 as uuid } from 'uuid';

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let mockRepo: Repository<Transaction>;

  const mockTransaction = new Transaction();
  mockTransaction.id = uuid();
  mockTransaction.productDescription = "Teste1";
  mockTransaction.sellerName = "John Doe";
  mockTransaction.transactionDate = new Date("2022-03-03T13:12:16-03:00");
  mockTransaction.transactionType = 1;
  mockTransaction.transactionValue = 0.01;

  const mockTransactionDTO: TransactionDTO = TransactionDTO.fromEntity(mockTransaction);
  const mockTransactionString: string = "12022-03-03T13:12:16-03:00TESTE1                        0000000001JOHN DOE";

  beforeAll(() => {
    mockRepo = {
      find: jest.fn().mockResolvedValue([mockTransaction]),
      save: jest.fn().mockResolvedValue(mockTransaction),
    } as unknown as Repository<Transaction>;

    transactionService = new TransactionService(mockRepo);
    
  });

  describe('getAll', () => {
    it('should return an array of TransactionDTOs', async () => {
      const transactions = await transactionService.getAll();
      expect(transactions).toEqual([mockTransactionDTO]);
    });

    it('should call find on the repository', async () => {
      await transactionService.getAll();
      expect(mockRepo.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should return a TransactionDTO', async () => {
      const transaction = await transactionService.create(mockTransactionDTO);
      expect(transaction).toEqual(mockTransactionDTO);
    });

    it('should call save on the repository with the correct arguments', async () => {
      await transactionService.create(mockTransactionDTO);
      expect(mockRepo.save).toHaveBeenCalledWith(mockTransaction);
    });
  });

  describe('createBulkFromPlainFile', () => {
    it('should return a success message with the number of transactions inserted', async () => {
      const result = await transactionService.createBulkFromPlainFile(mockTransactionString);
      expect(result).toEqual('Inserted 1 new product transactions.');
    });

    it('should call save on the repository for each transaction in the input string', async () => {
      await transactionService.createBulkFromPlainFile(mockTransactionString);
      expect(mockRepo.save).toHaveBeenCalledWith(mockTransaction);
    });
  });

  afterAll(async () => {
    //await app.close();
  });
});
