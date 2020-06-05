import {Entity, hasOne, model, property} from '@loopback/repository';
import {Seller} from './seller.model';
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
      columnName: 'firstName',
      dataType: 'text',
    },
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'lastName',
      dataType: 'text',
    },
  })
  lastName: string;

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
      columnName: 'cpf',
      dataType: 'text',
    },
  })
  cpf: string;

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
    required: true,
    postgresql: {
      columnName: 'birthday',
      dataType: 'timestamp with time zone',
    },
  })
  birthday: Date;

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

  // Define well-known properties here
  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasOne(() => Seller, {keyTo: 'userId'})
  seller: Seller;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {}
export type UserWithRelations = User & UserRelations;
