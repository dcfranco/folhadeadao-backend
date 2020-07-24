import {DefaultCrudRepository} from '@loopback/repository';
import {ProductImage, ProductImageRelations} from '../models';
import {SiteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductImageRepository extends DefaultCrudRepository<
  ProductImage,
  typeof ProductImage.prototype.ID,
  ProductImageRelations
> {
  constructor(
    @inject('datasources.site') dataSource: SiteDataSource,
  ) {
    super(ProductImage, dataSource);
  }
}
