import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SiteDataSource} from '../../datasources';
import {UserClient, UserClientRelations} from '../../models';

export class UserClientRepository extends DefaultCrudRepository<
  UserClient,
  typeof UserClient.prototype.ID,
  UserClientRelations
> {
  constructor(
    @inject('datasources.site') dataSource: SiteDataSource,
  ) {
    super(UserClient, dataSource);
  }
}
