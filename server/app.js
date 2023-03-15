import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import xss from 'xss-clean';

import globalErrorHandler from './src/controllers/error/errorController.js';
import verifyJWT from './src/middleware/verifyJWT.js';
import todoRouter from './src/routes/todoRoutes.js';
import userRouter from './src/routes/userRoutes.js';

dotenv.config({ path: './config.env' });

const app = express();

// Cookie parser
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept'
  // );
  next();
});

app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // enable origin cors

// GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from all API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000, // 1 hour
//   message: 'Too many requests from this IP, please try again in an hour!',
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize()); // rejects $ and . from req.body

// Data sanitization against XSS
app.use(xss()); // removes html tags from req.body

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', verifyJWT, todoRouter);

app.use(globalErrorHandler);

export default app;
