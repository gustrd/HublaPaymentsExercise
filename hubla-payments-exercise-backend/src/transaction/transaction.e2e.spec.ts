import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionModule } from './transaction.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Transaction } from '../model/transaction.entity';
import { v4 as uuidv4 } from 'uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';

describe('Transaction', () => {
  let app: INestApplication;
  let transactionService = { findAll: () => ['test'] };

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
  });

  describe('/transactions', () => {
    

    it('POST / should create a transaction', async () => {
      const transaction = new Transaction();
      transaction.id = new uuidv4();
      transaction.productDescription = "Test";
      transaction.sellerName = "John Doe";
      transaction.transactionDate = new Date(Date.now.toString());
      transaction.transactionType = 1;
      transaction.transactionValue = 0.01;

      const response = await request(app.getHttpServer())
        .post('/transaction')
        .send(transaction)
        .expect(201);

      expect(response.body).toEqual(transaction);
    });

    it('POST / should return an error if invalid data is sent', async () => {
      const transaction = new Transaction();

      const response = await request(app.getHttpServer())
        .post('/transaction')
        .send(transaction)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    it(`/GET / should list all the current transactions`, () => {
        return request(app.getHttpServer())
          .get('/transaction')
          .expect(200);
    });

  });

  afterAll(async () => {
    await app.close();
  });
});