import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import speakeasy from 'speakeasy';
import {FunnelToken} from '../models';
import {CustomerRepository, FunnelTokenRepository} from '../repositories';

export class FunnelTokenController {
  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
    @repository(FunnelTokenRepository)
    public funnelTokenRepository: FunnelTokenRepository,
  ) {}

  @post('/funnel-tokens', {
    responses: {
      '200': {
        description: 'FunnelToken model instance',
        content: {'application/json': {schema: getModelSchemaRef(FunnelToken)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FunnelToken, {
            title: 'NewFunnelToken',
            exclude: ['id', 'token'],
          }),
        },
      },
    })
    funnelToken: Omit<FunnelToken, 'id, token'>,
  ): Promise<FunnelToken> {
    const secret = speakeasy.generateSecret({length: 10}).base32;
    funnelToken.token = secret;
    return this.funnelTokenRepository.create(funnelToken);
  }

  @get('/funnel-tokens/count', {
    responses: {
      '200': {
        description: 'FunnelToken model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(FunnelToken) where?: Where<FunnelToken>,
  ): Promise<Count> {
    return this.funnelTokenRepository.count(where);
  }

  @get('/funnel-tokens', {
    responses: {
      '200': {
        description: 'Array of FunnelToken model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(FunnelToken, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(FunnelToken) filter?: Filter<FunnelToken>,
  ): Promise<FunnelToken[]> {
    return this.funnelTokenRepository.find(filter);
  }

  @patch('/funnel-tokens', {
    responses: {
      '200': {
        description: 'FunnelToken PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FunnelToken, {partial: true}),
        },
      },
    })
    funnelToken: FunnelToken,
    @param.where(FunnelToken) where?: Where<FunnelToken>,
  ): Promise<Count> {
    return this.funnelTokenRepository.updateAll(funnelToken, where);
  }

  @get('/funnel-tokens/{id}', {
    responses: {
      '200': {
        description: 'FunnelToken model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FunnelToken, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(FunnelToken, {exclude: 'where'})
    filter?: FilterExcludingWhere<FunnelToken>,
  ): Promise<FunnelToken> {
    return this.funnelTokenRepository.findById(id, filter);
  }

  @patch('/funnel-tokens/{id}', {
    responses: {
      '204': {
        description: 'FunnelToken PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FunnelToken, {partial: true}),
        },
      },
    })
    funnelToken: FunnelToken,
  ): Promise<void> {
    await this.funnelTokenRepository.updateById(id, funnelToken);
  }

  @put('/funnel-tokens/{id}', {
    responses: {
      '204': {
        description: 'FunnelToken PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() funnelToken: FunnelToken,
  ): Promise<void> {
    await this.funnelTokenRepository.replaceById(id, funnelToken);
  }

  @del('/funnel-tokens/{id}', {
    responses: {
      '204': {
        description: 'FunnelToken DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.funnelTokenRepository.deleteById(id);
  }
}
