import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entity/User';
import { Role } from './entity/Role';
import { Category } from './entity/Category';
import { Product } from './entity/Product';

const dbType = process.env.DB_TYPE || 'sqlite';
const logSql = process.env.LOG_SQL === 'true';

let dataSourceConfig: DataSourceOptions;

switch (dbType) {
  case 'mysql':
    dataSourceConfig = {
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'jpa_db',
      synchronize: true,
      logging: logSql,
      entities: [User, Role, Category, Product],
    };
    break;

  case 'postgres':
    dataSourceConfig = {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'jpa_db',
      synchronize: true,
      logging: logSql,
      entities: [User, Role, Category, Product],
    };
    break;

  case 'ibm_db2':
    dataSourceConfig = {
      type: 'ibm_db2',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '50000'),
      username: process.env.DB_USERNAME || 'db2admin',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'TESTDB',
      synchronize: true,
      logging: logSql,
      entities: [User, Role, Category, Product],
    } as unknown as DataSourceOptions;
    break;

  default: // sqlite
    dataSourceConfig = {
      type: 'sqlite',
      database: 'jpa_db.sqlite',
      synchronize: true,
      logging: logSql,
      entities: [User, Role, Category, Product],
    };
}

export const dataSource = new DataSource(dataSourceConfig);

console.log(`🔗 Database: ${dbType.toUpperCase()}`);
console.log(`📊 SQL Logging: ${logSql ? 'ENABLED' : 'DISABLED'}`);