import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import getConfig from './ormconfig';

dotenv.config({ path: './.env' });

function  connect(host: string | undefined): DataSource {
const datasource = new DataSource(getConfig(host));
  return datasource
}

export const customConnection = connect

const MigrationConnection = connect(process.env.MYSQL_MIGRATION_HOST)

export default MigrationConnection
