import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {UserClient} from './user-client.model';
import {User} from './user.model';

@model({
  settings: {mysql: {schema: 'folhad73_site', table: 'sys_admin' }},
})
export class UserAdmin extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'email',
    }
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'nome',
    }
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'is_representante',
    }
  })
  isSeller: number;

  @property({
    type: 'object',
    required: true,
    mysql: {
      columnName: 'tipo',
    }
  })
  type: object;

  @property({
    type: 'string',
  })
  token?: string;

  @property({
    type: 'date',
    required: true,
  })
  tokenExp: string;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'dataUp',
    }
  })
  dateUp: string;

  @property({
    type: 'date',
  })
  autokill?: string;

  @hasMany(() => UserClient, {keyTo: 'sellerId'})
  userClients: UserClient[];

  @hasOne(() => User, { keyFrom: 'email', keyTo: 'email' })
  user: User

  constructor(data?: Partial<UserAdmin>) {
    super(data);
  }
}

export interface UserAdminRelations {
  // describe navigational properties here
}

export type UserAdminWithRelations = UserAdmin & UserAdminRelations;
