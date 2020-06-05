import {Entity, model, property} from '@loopback/repository';

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
  })
  description?: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
  })
  updatedAt: string;

  @property({
    type: 'boolean',
    required: true,
    default: true,
  })
  active: boolean;

  constructor(data?: Partial<Funnel>) {
    super(data);
  }
}

export interface FunnelRelations {
  // describe navigational properties here
}

export type FunnelWithRelations = Funnel & FunnelRelations;
