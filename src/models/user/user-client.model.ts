import {Entity, model, property} from '@loopback/repository';

@model({
  settings: { mysql: { schema: 'folhad73_site', table: 'site_clientes' } },
})
export class UserClient extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'string',
    mysql: {
      columnName: 'avatar',
    }
  })
  image?: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'nome',
    }
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'celular',
    }
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  cpf: string;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'data_nascimento',
    }
  })
  birthday: string;

  @property({
    type: 'string',
    mysql: {
      columnName: 'medida_itens',
    }
  })
  itemsSize?: string;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'data_cadastro',
    }
  })
  createdAt: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'id_representante',
    }
  })
  sellerId: number;

  constructor(data?: Partial<UserClient>) {
    super(data);
  }
}

export interface UserClientRelations {
  // describe navigational properties here
}

export type UserClientWithRelations = UserClient & UserClientRelations;
