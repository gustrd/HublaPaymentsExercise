import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { TransactionController } from './transaction.controller';
import { TransactionModule } from './transaction.module';
import { TransactionDTO } from '../dto/transaction.dto';
import { SellerBalanceDTO } from '../dto/sellerBalance.dto';
import { TransactionService } from './transaction.service';
import { v4 as uuid } from 'uuid';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Readable } from 'node:stream';


//Test object builder
const transactionDto1 = new TransactionDTO();
transactionDto1.id = uuid();
transactionDto1.productDescription = "Teste1";
transactionDto1.sellerName = "John Doe";
transactionDto1.transactionDate = (new Date()).toISOString();
transactionDto1.transactionType = 1;
transactionDto1.transactionValue = 0.01;

const transactionDto2 = new TransactionDTO();
transactionDto2.id = uuid();
transactionDto2.productDescription = "Teste2";
transactionDto2.sellerName = "John Doe";
transactionDto2.transactionDate = (new Date("2022-03-03T13:12:16-03:00")).toISOString();
transactionDto2.transactionType = 1;
transactionDto2.transactionValue = 0.02;

const sellerBalanceDto1 = new SellerBalanceDTO(transactionDto1.sellerName, transactionDto1.transactionValue + transactionDto2.transactionValue);

const transactionFileBuffer = "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS\n12021-12-03T11:46:02-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA"

//Start of the tests

describe('TransactionController', () => {
  let transactionController: TransactionController;
  let transactionService : TransactionService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TransactionModule
      ]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true
    }));

    await app.init();

    transactionService = moduleRef.get<TransactionService>(TransactionService);
    transactionController = moduleRef.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(transactionController).toBeDefined();
  });

  it('should return an array of transaction DTOs', async () => {
    const expectedTransactions: TransactionDTO[] = [
      transactionDto1, transactionDto2
    ];
    jest.spyOn(transactionService, 'getAll').mockResolvedValue(expectedTransactions);

    const actualTransactions = await transactionController.getAll();

    expect(actualTransactions).toEqual(expectedTransactions);
  });

  it('should return an array of seller balance DTOs', async () => {
    const expectedTransactions: SellerBalanceDTO[] = [
      sellerBalanceDto1
    ];
    jest.spyOn(transactionService, 'getAllSellerBalance').mockResolvedValue([sellerBalanceDto1]);

    const actualTransactions = await transactionController.getAllSellerBalance();

    expect(actualTransactions).toEqual(expectedTransactions);
  });

  it('should create a new transaction DTO and return it', async () => {
    const dto: TransactionDTO = transactionDto1;
    const expectedDTO: TransactionDTO = transactionDto1;
    jest.spyOn(transactionService, 'create').mockResolvedValue(expectedDTO);

    const actualDTO = await transactionController.post(dto);

    expect(actualDTO).toEqual(expectedDTO);
  });

  it('should create multiple transaction DTOs from a plain file and return them', async () => {
    const file: Express.Multer.File = {
      fieldname: '',
      originalname: '',
      encoding: '',
      mimetype: '',
      size: 0,
      stream: new Readable(),
      destination: '',
      filename: '',
      path: '',
      buffer: Buffer.from(transactionFileBuffer, "utf-8")
    };

    const expectedResponse: string = "Inserted 2 new product transactions.";

    jest.spyOn(transactionService, 'createBulkFromPlainFile').mockResolvedValue(expectedResponse);

    const actualResponse = await transactionController.uploadFile(file);

    expect(actualResponse).toEqual(expectedResponse);
  });

  afterAll(async () => {
    await app.close();
  });
  
});
