import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SiteDataSource} from '../datasources';
import {Category, CategoryRelations, Product, Question} from '../models';
import {ProductRepository} from './product.repository';
import {QuestionRepository} from './question.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.ID,
  CategoryRelations
> {

  public readonly products: HasManyRepositoryFactory<Product, typeof Category.prototype.ID>;

  public readonly questions: HasManyRepositoryFactory<Question, typeof Category.prototype.ID>;

  constructor(
    @inject('datasources.site') dataSource: SiteDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('QuestionRepository') protected questionRepositoryGetter: Getter<QuestionRepository>,
  ) {
    super(Category, dataSource);
    this.questions = this.createHasManyRepositoryFactoryFor('questions', questionRepositoryGetter,);
    this.registerInclusionResolver('questions', this.questions.inclusionResolver);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
