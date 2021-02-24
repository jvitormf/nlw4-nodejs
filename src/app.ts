import 'reflect-metadata';
import express, { json } from 'express';

import createConnection from './database';

import { routes } from './routes';

createConnection();

const app = express();

app.use(json());

app.use(routes);

export { app };
