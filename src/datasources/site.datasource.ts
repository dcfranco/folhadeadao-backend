import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'site',
  connector: 'mysql',
  url: '',
  host: '162.241.203.47',
  port: 3306,
  user: 'folhad73_funil',
  password: 'vj,W%X8&R^qp',
  database: 'folhad73_site',
};

@lifeCycleObserver('datasource')
export class SiteDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'site';

  constructor(
    @inject('datasources.config.site', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
