import {Entity, model, property} from '@loopback/repository';

@model()
export class DomainType extends Entity {
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
  value: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;


  constructor(data?: Partial<DomainType>) {
    super(data);
  }
}

export interface DomainTypeRelations {
  // describe navigational properties here
}

export type DomainTypeWithRelations = DomainType & DomainTypeRelations;
