import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise
} from '@loopback/core';
import {juggler} from '@loopback/repository';

// const config = {
//   name: 'db',
//   connector: 'postgresql',
//   url:
//     'postgres://ztfgrngfnzhaeb:0170dcbd7c8db7bee0212fc138f5027506ac36b5d0a439b8e531ac275a105aed@ec2-34-198-243-120.compute-1.amazonaws.com:5432/d16hqc5g008idb',
//   host: 'ec2-34-198-243-120.compute-1.amazonaws.com',
//   port: 5432,
//   user: 'ztfgrngfnzhaeb',
//   password: '0170dcbd7c8db7bee0212fc138f5027506ac36b5d0a439b8e531ac275a105aed',
//   database: 'd16hqc5g008idb',
//   debug: true,
// };

const configDev = {
  name: 'db',
  connector: 'postgresql',
  url: 'postgres://postgres:daniel@localhost:5432/folhadeadao',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'daniel',
  database: 'folhadeadao',
  debug: true,
};

@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = configDev,
  ) {
    super(dsConfig);
  }

  start(): ValueOrPromise<void> {}

  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
