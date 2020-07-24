import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Domain,
  DomainType
} from '../models';
import {DomainRepository} from '../repositories';

export class DomainDomainTypeController {
  constructor(
    @repository(DomainRepository)
    public domainRepository: DomainRepository,
  ) { }

  @get('/domains/{id}/domain-type', {
    responses: {
      '200': {
        description: 'DomainType belonging to Domain',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DomainType)},
          },
        },
      },
    },
  })
  async getDomainType(
    @param.path.number('id') id: typeof Domain.prototype.id,
  ): Promise<DomainType> {
    return this.domainRepository.domainType(id);
  }
}
