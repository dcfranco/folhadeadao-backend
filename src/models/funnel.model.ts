import {Entity, hasMany, model, property} from '@loopback/repository';
import {Question} from './question.model';

@model()
export class Funnel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  steps: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean;

  @hasMany(() => Question)
  questions: Question[];

  constructor(data?: Partial<Funnel>) {
    super(data);
  }
}

export interface FunnelRelations {
  // describe navigational properties here
}

export type FunnelWithRelations = Funnel & FunnelRelations;
