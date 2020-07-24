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
  Funnel,
  Question,
} from '../models';
import {FunnelRepository} from '../repositories';

export class FunnelQuestionController {
  constructor(
    @repository(FunnelRepository) protected funnelRepository: FunnelRepository,
  ) { }

  @get('/funnels/{id}/questions', {
    responses: {
      '200': {
        description: 'Array of Funnel has many Question',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Question)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Question>,
  ): Promise<Question[]> {
    return this.funnelRepository.questions(id).find(filter);
  }

  @post('/funnels/{id}/questions', {
    responses: {
      '200': {
        description: 'Funnel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Question)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Funnel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Question, {
            title: 'NewQuestionInFunnel',
            exclude: ['id'],
            optional: ['funnelId']
          }),
        },
      },
    }) question: Omit<Question, 'id'>,
  ): Promise<Question> {
    return this.funnelRepository.questions(id).create(question);
  }

  @patch('/funnels/{id}/questions', {
    responses: {
      '200': {
        description: 'Funnel.Question PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Question, {partial: true}),
        },
      },
    })
    question: Partial<Question>,
    @param.query.object('where', getWhereSchemaFor(Question)) where?: Where<Question>,
  ): Promise<Count> {
    return this.funnelRepository.questions(id).patch(question, where);
  }

  @del('/funnels/{id}/questions', {
    responses: {
      '200': {
        description: 'Funnel.Question DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Question)) where?: Where<Question>,
  ): Promise<Count> {
    return this.funnelRepository.questions(id).delete(where);
  }
}
