import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverlessExpress from 'aws-serverless-express';
import * as express from 'express';

let cachedServer: any;

async function bootstrapServer() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();
  return serverlessExpress.createServer(expressApp);
}

export const handler: Handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return serverlessExpress.proxy(cachedServer, event, context);
};
