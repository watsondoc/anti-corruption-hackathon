import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresqlService {
  // Example function to handle database operations
  async exampleQuery() {
    // Use repositories or query builders for operations
    return 'Query executed';
  }
}
