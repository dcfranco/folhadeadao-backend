import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Category} from './category.model';
import {Domain} from './domain.model';
import {Type} from './type.model';

@model()
export class Question extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  order: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isRequired: boolean;
  @property({
    type: 'number',
    required: true,
  })
  funnelId: number;

  @belongsTo(() => Category)
  categoryId: number;

  @property({
    type: 'number',
    required: true,
  })
  maxSelectable: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @hasMany(() => Domain)
  domains: Domain[];

  @belongsTo(() => Type)
  typeId: number;

  constructor(data?: Partial<Question>) {
    super(data);
  }
}

export interface QuestionRelations {
  // describe navigational properties here
}

export type QuestionWithRelations = Question & QuestionRelations;
