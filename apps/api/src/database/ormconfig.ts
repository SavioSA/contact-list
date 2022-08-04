import * as dotenv from 'dotenv';
import { join, resolve } from 'path';
import { DataSourceOptions } from 'typeorm';

dotenv.config({ path: './.env' });

export default function getConfig(host = process.env.MYSQL_MIGRATION_HOST) {
  return {
    type: 'mysql',
    port: parseInt(process.env.MYSQL_PORT as string, 10),
    host,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    logging: false,
    synchronize: false,
    name: 'default',
    entities: [resolve(`${join(__dirname)}/entities/*.js`)],
    migrations: [join(__dirname, '../../../../dist/apps/api/src/database/migrations/**')],
    subscribers: ['dist/src/database/subscriber/**'],
  } as DataSourceOptions;
}
