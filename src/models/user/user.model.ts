import {Entity, hasOne, model, property} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';

@model({})
export class User extends Entity {
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
      columnName: 'name',
      dataType: 'text',
    },
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'email',
      dataType: 'text',
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'username',
      dataType: 'text',
    },
  })
  username: string;

  @property({
    type: 'Date',
    postgresql: {
      columnName: 'lastLogin',
      dataType: 'timestamp with time zone',
    },
  })
  lastLogin?: Date;

  @property({
    type: 'Boolean',
    required: true,
    postgresql: {
      columnName: 'isBlocked',
      dataType: 'boolean',
    },
  })
  isBlocked: boolean;

  @property({
    type: 'Boolean',
    required: true,
    postgresql: {
      columnName: 'isAdmin',
      dataType: 'boolean',
    },
  })
  isAdmin: boolean;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
