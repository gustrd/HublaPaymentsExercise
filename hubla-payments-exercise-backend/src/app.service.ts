import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is only a back-end. You need to access /docs to see the Swagger documentation.';
  }
}
