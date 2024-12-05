import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresqlService } from './postgresql.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 54321,
      username: 'postgres',
      password: '',
      database: 'corruption',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  providers: [PostgresqlService],
  exports: [PostgresqlService],
})
export class PostgresqlModule {}
