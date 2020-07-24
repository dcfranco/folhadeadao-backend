import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Domain, DomainRelations, DomainType} from '../models';
import {DomainTypeRepository} from './domain-type.repository';

export class DomainRepository extends DefaultCrudRepository<
  Domain,
  typeof Domain.prototype.id,
  DomainRelations
> {

  public readonly domainType: BelongsToAccessor<DomainType, typeof Domain.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DomainTypeRepository') protected domainTypeRepositoryGetter: Getter<DomainTypeRepository>,
  ) {
    super(Domain, dataSource);
    this.domainType = this.createBelongsToAccessorFor('domainType', domainTypeRepositoryGetter,);
    this.registerInclusionResolver('domainType', this.domainType.inclusionResolver);
  }
}
