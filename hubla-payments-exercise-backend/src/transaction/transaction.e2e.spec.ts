import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionModule } from './transaction.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { TransactionDTO } from '../dto/transaction.dto';

describe('Transaction', () => {
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
  });

  describe('/transactions', () => {
  
    it('POST / should create a transaction', async () => {
      const dto = new TransactionDTO();
      dto.id = uuid();
      dto.productDescription = "Test";
      dto.sellerName = "John Doe";
      dto.transactionDate = (new Date()).toISOString();
      dto.transactionType = 1;
      dto.transactionValue = 0.01;

      const response = await request(app.getHttpServer())
        .post('/transaction')
        .send(dto)
        .expect(201);

      expect(response.body as TransactionDTO).toEqual(dto);
    });

    it('POST / should return an error if invalid data is sent', async () => {
      const transactionDTO = new TransactionDTO();

      const response = await request(app.getHttpServer())
        .post('/transaction')
        .send(transactionDTO)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    it('POST File / should create bulk transactions', async () => {
      var testFile = './test/files/transactionUploadValidTestFile.txt';

      const response = await request(app.getHttpServer())
        .post('/transaction/upload')
        .set('Content-Type', 'multipart/form-data')
        .attach('file', testFile)
        .expect(201);

      expect(response.body).toBeDefined();
    });

    it('POST File / should not create invalid bulk transactions', async () => {
      var testFile = './test/files/transactionUploadInvalidTestFile.txt';

      return request(app.getHttpServer())
        .post('/transaction/upload')
        .set('Content-Type', 'multipart/form-data')
        .attach('file', testFile)
        .expect(403);
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