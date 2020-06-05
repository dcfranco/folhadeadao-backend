import {DefaultCrudRepository} from '@loopback/repository';
import {FunnelAnswers, FunnelAnswersRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FunnelAnswersRepository extends DefaultCrudRepository<
  FunnelAnswers,
  typeof FunnelAnswers.prototype.id,
  FunnelAnswersRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(FunnelAnswers, dataSource);
  }
}
