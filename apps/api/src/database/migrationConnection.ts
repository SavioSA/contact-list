import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import getConfig from './ormconfig';

dotenv.config({ path: './.env' });

function connect(host: string | undefined): DataSource {
  const datasource = new DataSource(getConfig(host));
  return datasource;
}

const migrationConnection = connect(process.env.MYSQL_MIGRATION_HOST);
export default migrationConnection;
