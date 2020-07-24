import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Category, Domain, Question, QuestionRelations, Type} from '../models';
import {CategoryRepository} from './category.repository';
import {DomainRepository} from './domain.repository';
import {TypeRepository} from './type.repository';

export class QuestionRepository extends DefaultCrudRepository<
  Question,
  typeof Question.prototype.id,
  QuestionRelations
> {

  public readonly domains: HasManyRepositoryFactory<Domain, typeof Question.prototype.id>;

  public readonly type: BelongsToAccessor<Type, typeof Question.prototype.id>;

  public readonly category: BelongsToAccessor<Category, typeof Question.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DomainRepository')
    protected domainRepositoryGetter: Getter<DomainRepository>,
    @repository.getter('TypeRepository')
    protected typeRepositoryGetter: Getter<TypeRepository>,
    @repository.getter('CategoryRepository')
    protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Question, dataSource);
    this.type = this.createBelongsToAccessorFor('type', typeRepositoryGetter,);
    this.registerInclusionResolver('type', this.type.inclusionResolver);
    this.domains = this.createHasManyRepositoryFactoryFor('domains', domainRepositoryGetter,);
    this.registerInclusionResolver('domains', this.domains.inclusionResolver);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
