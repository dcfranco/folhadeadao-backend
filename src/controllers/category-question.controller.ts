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
  Category,
  Question,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryQuestionController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/questions', {
    responses: {
      '200': {
        description: 'Array of Category has many Question',
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
    return this.categoryRepository.questions(id).find(filter);
  }

  @post('/categories/{id}/questions', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Question)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Category.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Question, {
            title: 'NewQuestionInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) question: Omit<Question, 'id'>,
  ): Promise<Question> {
    return this.categoryRepository.questions(id).create(question);
  }

  @patch('/categories/{id}/questions', {
    responses: {
      '200': {
        description: 'Category.Question PATCH success count',
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
    return this.categoryRepository.questions(id).patch(question, where);
  }

  @del('/categories/{id}/questions', {
    responses: {
      '200': {
        description: 'Category.Question DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Question)) where?: Where<Question>,
  ): Promise<Count> {
    return this.categoryRepository.questions(id).delete(where);
  }
}
