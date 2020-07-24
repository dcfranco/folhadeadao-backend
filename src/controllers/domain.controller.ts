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
import {Domain} from '../models';
import {DomainRepository} from '../repositories';

export class DomainController {
  constructor(
    @repository(DomainRepository)
    public domainRepository : DomainRepository,
  ) {}

  @post('/domains', {
    responses: {
      '200': {
        description: 'Domain model instance',
        content: {'application/json': {schema: getModelSchemaRef(Domain)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domain, {
            title: 'NewDomain',
            exclude: ['id'],
          }),
        },
      },
    })
    domain: Omit<Domain, 'id'>,
  ): Promise<Domain> {
    return this.domainRepository.create(domain);
  }

  @get('/domains/count', {
    responses: {
      '200': {
        description: 'Domain model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Domain) where?: Where<Domain>,
  ): Promise<Count> {
    return this.domainRepository.count(where);
  }

  @get('/domains', {
    responses: {
      '200': {
        description: 'Array of Domain model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Domain, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Domain) filter?: Filter<Domain>,
  ): Promise<Domain[]> {
    return this.domainRepository.find(filter);
  }

  @patch('/domains', {
    responses: {
      '200': {
        description: 'Domain PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domain, {partial: true}),
        },
      },
    })
    domain: Domain,
    @param.where(Domain) where?: Where<Domain>,
  ): Promise<Count> {
    return this.domainRepository.updateAll(domain, where);
  }

  @get('/domains/{id}', {
    responses: {
      '200': {
        description: 'Domain model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Domain, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Domain, {exclude: 'where'}) filter?: FilterExcludingWhere<Domain>
  ): Promise<Domain> {
    return this.domainRepository.findById(id, filter);
  }

  @patch('/domains/{id}', {
    responses: {
      '204': {
        description: 'Domain PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domain, {partial: true}),
        },
      },
    })
    domain: Domain,
  ): Promise<void> {
    await this.domainRepository.updateById(id, domain);
  }

  @put('/domains/{id}', {
    responses: {
      '204': {
        description: 'Domain PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() domain: Domain,
  ): Promise<void> {
    await this.domainRepository.replaceById(id, domain);
  }

  @del('/domains/{id}', {
    responses: {
      '204': {
        description: 'Domain DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.domainRepository.deleteById(id);
  }
}
