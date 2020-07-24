import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Category} from './category.model';
import {ProductImage} from './product-image.model';

@model({
  settings: {mysql: {schema: 'folhad73_site', table: 'site_produtos_exclusivos'}},
})
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'number',
  })
  ordem?: number;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
  })
  descricao?: string;

  @property({
    type: 'string',
    mysql: {
      columnName: 'valor_anterior',
    }
  })
  valorAnterior?: string;

  @property({
    type: 'string',
    required: true,
  })
  valor: string;

  @property({
    type: 'string',
  })
  estoque?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
    required: true,
  })
  tamanho: string;

  @belongsTo(() => Category, {name: 'category'})
  categoria: number;

  @hasMany(() => ProductImage, {keyTo: 'pageID'})
  images: ProductImage[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
}

export type ProductWithRelations = Product & ProductRelations;
