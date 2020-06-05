import {ApplicationConfig} from '@loopback/core';
import {SalesFunnelApplication} from './application';

export {SalesFunnelApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new SalesFunnelApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}
