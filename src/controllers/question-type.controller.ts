import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Question,
  Type,
} from '../models';
import {QuestionRepository} from '../repositories';

export class QuestionTypeController {
  constructor(
    @repository(QuestionRepository)
    public questionRepository: QuestionRepository,
  ) { }

  @get('/questions/{id}/type', {
    responses: {
      '200': {
        description: 'Type belonging to Question',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Type)},
          },
        },
      },
    },
  })
  async getType(
    @param.path.number('id') id: typeof Question.prototype.id,
  ): Promise<Type> {
    return this.questionRepository.type(id);
  }
}
