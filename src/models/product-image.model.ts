import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {mysql: {schema: 'folhad73_site', table: 'site_pages_fotos'}},
})
export class ProductImage extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'string',
    required: true,
  })
  page: string;

  @property({
    type: 'number',
    required: true,
  })
  pageID: number;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'string',
  })
  legenda?: string;

  @property({
    type: 'number',
    default: 0,
  })
  ordem?: number;

  constructor(data?: Partial<ProductImage>) {
    super(data);
  }
}

export interface ProductImageRelations {
  // describe navigational properties here
}

export type ProductImageWithRelations = ProductImage & ProductImageRelations;
