import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {SiteDataSource} from '../datasources';
import {Product, ProductRelations, Category, ProductImage} from '../models';
import {CategoryRepository} from './category.repository';
import {ProductImageRepository} from './product-image.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.ID,
  ProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof Product.prototype.ID>;

  public readonly images: HasManyRepositoryFactory<ProductImage, typeof Product.prototype.ID>;

  constructor(
    @inject('datasources.site') dataSource: SiteDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('ProductImageRepository') protected productImageRepositoryGetter: Getter<ProductImageRepository>,
  ) {
    super(Product, dataSource);
    this.images = this.createHasManyRepositoryFactoryFor('images', productImageRepositoryGetter,);
    this.registerInclusionResolver('images', this.images.inclusionResolver);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
  }
}
