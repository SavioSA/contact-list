import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config({ path: './.env' });

export default function getConfig(host = process.env.MYSQL_MIGRATION_HOST) {
  return {
    type: 'mysql',
    port: parseInt(process.env.MYSQL_PORT as string),
    host: host,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['apps/api/src/database/entities/**.entity{.ts}'],
    migrations: ['apps/api/src/database/migrations/*.ts'],
    subscribers: ['src/database/subscriber/**/*{.ts}'],
  } as DataSourceOptions;
}
