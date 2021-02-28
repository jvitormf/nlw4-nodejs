import 'reflect-metadata';
import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import createConnection from './database';

import { routes } from './routes';
import { AppError } from './errors/AppError';

createConnection();

const app = express();

app.use(json());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'Error',
      message: `Internal Server Error ${err.message}`,
    });
  },
);

export { app };
