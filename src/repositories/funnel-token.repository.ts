import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {
  Customer,
  FunnelAnswers,
  FunnelToken,
  FunnelTokenRelations,
  Seller,
} from '../models';
import {CustomerRepository} from './customer.repository';
import {FunnelAnswersRepository} from './funnel-answers.repository';
import {SellerRepository} from './seller.repository';

export class FunnelTokenRepository extends DefaultCrudRepository<
  FunnelToken,
  typeof FunnelToken.prototype.id,
  FunnelTokenRelations
> {
  public readonly customer: BelongsToAccessor<
    Customer,
    typeof FunnelToken.prototype.id
  >;

  public readonly seller: BelongsToAccessor<
    Seller,
    typeof FunnelToken.prototype.id
  >;

  public readonly funnelAnswers: HasManyRepositoryFactory<
    FunnelAnswers,
    typeof FunnelToken.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>,
    @repository.getter('SellerRepository')
    protected sellerRepositoryGetter: Getter<SellerRepository>,
    @repository.getter('FunnelAnswersRepository')
    protected funnelAnswersRepositoryGetter: Getter<FunnelAnswersRepository>,
  ) {
    super(FunnelToken, dataSource);
    this.funnelAnswers = this.createHasManyRepositoryFactoryFor(
      'funnelAnswers',
      funnelAnswersRepositoryGetter,
    );
    this.registerInclusionResolver(
      'funnelAnswers',
      this.funnelAnswers.inclusionResolver,
    );
    this.customer = this.createBelongsToAccessorFor(
      'customer',
      customerRepositoryGetter,
    );
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.seller = this.createBelongsToAccessorFor(
      'seller',
      sellerRepositoryGetter,
    );
    this.registerInclusionResolver('seller', this.seller.inclusionResolver);
  }
}
