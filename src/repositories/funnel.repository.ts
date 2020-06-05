import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Funnel, FunnelRelations} from '../models';

export class FunnelRepository extends DefaultCrudRepository<
  Funnel,
  typeof Funnel.prototype.id,
  FunnelRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Funnel, dataSource);
  }
}
