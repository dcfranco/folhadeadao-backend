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
import {DomainType} from '../models';
import {DomainTypeRepository} from '../repositories';

export class DomainTypeController {
  constructor(
    @repository(DomainTypeRepository)
    public domainTypeRepository : DomainTypeRepository,
  ) {}

  @post('/domain-types', {
    responses: {
      '200': {
        description: 'DomainType model instance',
        content: {'application/json': {schema: getModelSchemaRef(DomainType)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DomainType, {
            title: 'NewDomainType',
            exclude: ['id'],
          }),
        },
      },
    })
    domainType: Omit<DomainType, 'id'>,
  ): Promise<DomainType> {
    return this.domainTypeRepository.create(domainType);
  }

  @get('/domain-types/count', {
    responses: {
      '200': {
        description: 'DomainType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DomainType) where?: Where<DomainType>,
  ): Promise<Count> {
    return this.domainTypeRepository.count(where);
  }

  @get('/domain-types', {
    responses: {
      '200': {
        description: 'Array of DomainType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DomainType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DomainType) filter?: Filter<DomainType>,
  ): Promise<DomainType[]> {
    return this.domainTypeRepository.find(filter);
  }

  @patch('/domain-types', {
    responses: {
      '200': {
        description: 'DomainType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DomainType, {partial: true}),
        },
      },
    })
    domainType: DomainType,
    @param.where(DomainType) where?: Where<DomainType>,
  ): Promise<Count> {
    return this.domainTypeRepository.updateAll(domainType, where);
  }

  @get('/domain-types/{id}', {
    responses: {
      '200': {
        description: 'DomainType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DomainType, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DomainType, {exclude: 'where'}) filter?: FilterExcludingWhere<DomainType>
  ): Promise<DomainType> {
    return this.domainTypeRepository.findById(id, filter);
  }

  @patch('/domain-types/{id}', {
    responses: {
      '204': {
        description: 'DomainType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DomainType, {partial: true}),
        },
      },
    })
    domainType: DomainType,
  ): Promise<void> {
    await this.domainTypeRepository.updateById(id, domainType);
  }

  @put('/domain-types/{id}', {
    responses: {
      '204': {
        description: 'DomainType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() domainType: DomainType,
  ): Promise<void> {
    await this.domainTypeRepository.replaceById(id, domainType);
  }

  @del('/domain-types/{id}', {
    responses: {
      '204': {
        description: 'DomainType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.domainTypeRepository.deleteById(id);
  }
}
