import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {DomainType, DomainTypeRelations} from '../models';

export class DomainTypeRepository extends DefaultCrudRepository<
  DomainType,
  typeof DomainType.prototype.id,
  DomainTypeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(DomainType, dataSource);
  }
}
