import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import bodyParser from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';
import sequelize from './db.config';
import router from './routes/index.route';

// ------------------- App configs ---------------------------
const app: Express = express();

app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-acces-token',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

// -----------------------------------------------------------

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
  });

// ---------------------- Routes -----------------------------
app.use(router);
// -----------------------------------------------------------

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
