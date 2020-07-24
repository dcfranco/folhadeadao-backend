import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {UserClientRepository} from '..';
import {SiteDataSource} from '../../datasources';
import {User, UserAdmin, UserAdminRelations, UserClient} from '../../models';
import {UserRepository} from './user.repository';

export class UserAdminRepository extends DefaultCrudRepository<
  UserAdmin,
  typeof UserAdmin.prototype.ID,
  UserAdminRelations
> {

  public readonly userClients: HasManyRepositoryFactory<UserClient, typeof UserAdmin.prototype.ID>;

  public readonly user: HasOneRepositoryFactory<
    User,
    typeof User.prototype.email
  >;

  constructor(
    @inject('datasources.site') dataSource: SiteDataSource,
    @repository.getter('UserClientRepository')
    protected userClientRepositoryGetter: Getter<UserClientRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserAdmin, dataSource);
    this.userClients = this.createHasManyRepositoryFactoryFor('userClients', userClientRepositoryGetter,);
    this.registerInclusionResolver('userClients', this.userClients.inclusionResolver);

    this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter)
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }

}
