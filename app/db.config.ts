import { Sequelize } from 'sequelize';

const dbName: string = "gestion-stock" || '';
const dbUsername: string = "postgres" || '';
const dbPassword: string = "123456789" || '';
const dbHost: string = "localhost" || '';

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  logging: false,
});

// sequelize.sync({ force: true });
sequelize.sync({ alter: true });

export default sequelize;
