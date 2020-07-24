import {Entity, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';
import {Question} from './question.model';

@model({
  settings: { mysql: { schema: 'folhad73_site', table: 'site_produtos_exclusivos_categorias'} },
})
export class Category extends Entity {
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
  categoria: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  pai?: string;

  @hasMany(() => Product, {keyTo: 'categoria'})
  products: Product[];

  @hasMany(() => Question)
  questions: Question[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
}

export type CategoryWithRelations = Category & CategoryRelations;
