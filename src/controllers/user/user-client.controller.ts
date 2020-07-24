import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,
  requestBody
} from '@loopback/rest';
import {UserClient} from '../../models';
import {UserClientRepository} from '../../repositories';

export class UserClientController {
  constructor(
    @repository(UserClientRepository)
    public userClientRepository : UserClientRepository,
  ) {}

  @post('/user-clients', {
    responses: {
      '200': {
        description: 'UserClient model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserClient)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserClient, {
            title: 'NewUserClient',
            exclude: ['ID'],
          }),
        },
      },
    })
    userClient: Omit<UserClient, 'ID'>,
  ): Promise<UserClient> {
    return this.userClientRepository.create(userClient);
  }

  @get('/user-clients/count', {
    responses: {
      '200': {
        description: 'UserClient model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserClient) where?: Where<UserClient>,
  ): Promise<Count> {
    return this.userClientRepository.count(where);
  }

  @get('/user-clients', {
    responses: {
      '200': {
        description: 'Array of UserClient model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserClient, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserClient) filter?: Filter<UserClient>,
  ): Promise<UserClient[]> {
    return this.userClientRepository.find(filter);
  }

  @patch('/user-clients', {
    responses: {
      '200': {
        description: 'UserClient PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserClient, {partial: true}),
        },
      },
    })
    userClient: UserClient,
    @param.where(UserClient) where?: Where<UserClient>,
  ): Promise<Count> {
    return this.userClientRepository.updateAll(userClient, where);
  }

  @get('/user-clients/{id}', {
    responses: {
      '200': {
        description: 'UserClient model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserClient, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserClient, {exclude: 'where'}) filter?: FilterExcludingWhere<UserClient>
  ): Promise<UserClient> {
    return this.userClientRepository.findById(id, filter);
  }

  @patch('/user-clients/{id}', {
    responses: {
      '204': {
        description: 'UserClient PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserClient, {partial: true}),
        },
      },
    })
    userClient: UserClient,
  ): Promise<void> {
    await this.userClientRepository.updateById(id, userClient);
  }

  @put('/user-clients/{id}', {
    responses: {
      '204': {
        description: 'UserClient PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userClient: UserClient,
  ): Promise<void> {
    await this.userClientRepository.replaceById(id, userClient);
  }

  @del('/user-clients/{id}', {
    responses: {
      '204': {
        description: 'UserClient DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userClientRepository.deleteById(id);
  }
}
