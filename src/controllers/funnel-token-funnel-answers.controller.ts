import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  FunnelToken,
  FunnelAnswers,
} from '../models';
import {FunnelTokenRepository} from '../repositories';

export class FunnelTokenFunnelAnswersController {
  constructor(
    @repository(FunnelTokenRepository) protected funnelTokenRepository: FunnelTokenRepository,
  ) { }

  @get('/funnel-tokens/{id}/funnel-answers', {
    responses: {
      '200': {
        description: 'Array of FunnelToken has many FunnelAnswers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FunnelAnswers)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FunnelAnswers>,
  ): Promise<FunnelAnswers[]> {
    return this.funnelTokenRepository.funnelAnswers(id).find(filter);
  }

  @post('/funnel-tokens/{id}/funnel-answers', {
    responses: {
      '200': {
        description: 'FunnelToken model instance',
        content: {'application/json': {schema: getModelSchemaRef(FunnelAnswers)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof FunnelToken.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FunnelAnswers, {
            title: 'NewFunnelAnswersInFunnelToken',
            exclude: ['id'],
            optional: ['funnelTokenId']
          }),
        },
      },
    }) funnelAnswers: Omit<FunnelAnswers, 'id'>,
  ): Promise<FunnelAnswers> {
    return this.funnelTokenRepository.funnelAnswers(id).create(funnelAnswers);
  }

  @patch('/funnel-tokens/{id}/funnel-answers', {
    responses: {
      '200': {
        description: 'FunnelToken.FunnelAnswers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FunnelAnswers, {partial: true}),
        },
      },
    })
    funnelAnswers: Partial<FunnelAnswers>,
    @param.query.object('where', getWhereSchemaFor(FunnelAnswers)) where?: Where<FunnelAnswers>,
  ): Promise<Count> {
    return this.funnelTokenRepository.funnelAnswers(id).patch(funnelAnswers, where);
  }

  @del('/funnel-tokens/{id}/funnel-answers', {
    responses: {
      '200': {
        description: 'FunnelToken.FunnelAnswers DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FunnelAnswers)) where?: Where<FunnelAnswers>,
  ): Promise<Count> {
    return this.funnelTokenRepository.funnelAnswers(id).delete(where);
  }
}
