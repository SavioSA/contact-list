import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import getConfig from './ormconfig';

dotenv.config({ path: './.env' });

function connect(host: string | undefined): DataSource {
  const datasource = new DataSource(getConfig(host));
  return datasource;
}

export const dbConnection = connect(process.env.MYSQL_HOST);

export default dbConnection;
