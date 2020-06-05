import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Seller, SellerRelations, User, FunnelToken} from '../models';
import {UserRepository} from './user.repository';
import {FunnelTokenRepository} from './funnel-token.repository';

export class SellerRepository extends DefaultCrudRepository<
  Seller,
  typeof Seller.prototype.id,
  SellerRelations
> {
  public readonly user: BelongsToAccessor<User, typeof Seller.prototype.id>;

  public readonly funnelTokens: HasManyRepositoryFactory<FunnelToken, typeof Seller.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('FunnelTokenRepository') protected funnelTokenRepositoryGetter: Getter<FunnelTokenRepository>,
  ) {
    super(Seller, dataSource);
    this.funnelTokens = this.createHasManyRepositoryFactoryFor('funnelTokens', funnelTokenRepositoryGetter,);
    this.registerInclusionResolver('funnelTokens', this.funnelTokens.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
