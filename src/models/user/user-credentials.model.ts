import {Entity, model, property} from '@loopback/repository';

@model({})
export class UserCredentials extends Entity {
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
    postgresql: {
      columnName: 'password',
      dataType: 'text',
    },
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'userId',
      dataType: 'text',
    },
  })
  userId: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {}

export type UserCredentialsWithRelations = UserCredentials &
  UserCredentialsRelations;
