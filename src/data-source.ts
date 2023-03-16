import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';

const dataSourceConfig = (): DataSourceOptions => {
  const generatePath = (pathname: string): string => path.join(__dirname, pathname);
  const entitiesPath: string = generatePath("./entities/**.{ts,js}");
  const migrationsPath: string = generatePath("./migrations/**.{ts,js}");

  const databaseURL: string | undefined = process.env.DATABASE_URL;

  if (!databaseURL) throw new Error('Env var DATABASE_URL does not exists');

  return {
    type: 'postgres',
    url: databaseURL,
    synchronize: false,
    logging: true,
    migrations: [migrationsPath],
    entities: [entitiesPath],
  }
}

const AppDataSource: DataSource = new DataSource(dataSourceConfig());

export default AppDataSource;