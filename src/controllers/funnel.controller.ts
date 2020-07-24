import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Funnel} from '../models';
import {FunnelRepository} from '../repositories';

export class FunnelController {
  constructor(
    @repository(FunnelRepository)
    public funnelRepository : FunnelRepository,
  ) {}

  @post('/funnels', {
    responses: {
      '200': {
        description: 'Funnel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Funnel)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funnel, {
            title: 'NewFunnel',
            exclude: ['id'],
          }),
        },
      },
    })
    funnel: Omit<Funnel, 'id'>,
  ): Promise<Funnel> {
    return this.funnelRepository.create(funnel);
  }

  @get('/funnels/count', {
    responses: {
      '200': {
        description: 'Funnel model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Funnel) where?: Where<Funnel>,
  ): Promise<Count> {
    return this.funnelRepository.count(where);
  }

  @get('/funnels', {
    responses: {
      '200': {
        description: 'Array of Funnel model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Funnel, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Funnel) filter?: Filter<Funnel>,
  ): Promise<Funnel[]> {
    return this.funnelRepository.find(filter);
  }

  @patch('/funnels', {
    responses: {
      '200': {
        description: 'Funnel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funnel, {partial: true}),
        },
      },
    })
    funnel: Funnel,
    @param.where(Funnel) where?: Where<Funnel>,
  ): Promise<Count> {
    return this.funnelRepository.updateAll(funnel, where);
  }

  @get('/funnels/{id}', {
    responses: {
      '200': {
        description: 'Funnel model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Funnel, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Funnel, {exclude: 'where'}) filter?: FilterExcludingWhere<Funnel>
  ): Promise<Funnel> {
    return this.funnelRepository.findById(id, filter);
  }

  @patch('/funnels/{id}', {
    responses: {
      '204': {
        description: 'Funnel PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funnel, {partial: true}),
        },
      },
    })
    funnel: Funnel,
  ): Promise<void> {
    await this.funnelRepository.updateById(id, funnel);
  }

  @put('/funnels/{id}', {
    responses: {
      '204': {
        description: 'Funnel PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() funnel: Funnel,
  ): Promise<void> {
    await this.funnelRepository.replaceById(id, funnel);
  }

  @del('/funnels/{id}', {
    responses: {
      '204': {
        description: 'Funnel DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.funnelRepository.deleteById(id);
  }
}
