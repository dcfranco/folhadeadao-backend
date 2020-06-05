import {Entity, model, property} from '@loopback/repository';

@model()
export class Customer extends Entity {
  @property({
    id: true,
    type: 'Number',
    required: false,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'genre',
      dataType: 'text',
    },
  })
  genre: string;

  @property({
    type: 'Date',
    postgresql: {
      columnName: 'createdAt',
      dataType: 'timestamp with time zone',
    },
  })
  createdAt: Date;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
