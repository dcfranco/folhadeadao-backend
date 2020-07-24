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
  Question,
  Domain,
} from '../models';
import {QuestionRepository} from '../repositories';

export class QuestionDomainController {
  constructor(
    @repository(QuestionRepository) protected questionRepository: QuestionRepository,
  ) { }

  @get('/questions/{id}/domains', {
    responses: {
      '200': {
        description: 'Array of Question has many Domain',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Domain)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Domain>,
  ): Promise<Domain[]> {
    return this.questionRepository.domains(id).find(filter);
  }

  @post('/questions/{id}/domains', {
    responses: {
      '200': {
        description: 'Question model instance',
        content: {'application/json': {schema: getModelSchemaRef(Domain)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Question.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domain, {
            title: 'NewDomainInQuestion',
            exclude: ['id'],
            optional: ['questionId']
          }),
        },
      },
    }) domain: Omit<Domain, 'id'>,
  ): Promise<Domain> {
    return this.questionRepository.domains(id).create(domain);
  }

  @patch('/questions/{id}/domains', {
    responses: {
      '200': {
        description: 'Question.Domain PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domain, {partial: true}),
        },
      },
    })
    domain: Partial<Domain>,
    @param.query.object('where', getWhereSchemaFor(Domain)) where?: Where<Domain>,
  ): Promise<Count> {
    return this.questionRepository.domains(id).patch(domain, where);
  }

  @del('/questions/{id}/domains', {
    responses: {
      '200': {
        description: 'Question.Domain DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Domain)) where?: Where<Domain>,
  ): Promise<Count> {
    return this.questionRepository.domains(id).delete(where);
  }
}
