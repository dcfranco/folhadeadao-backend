import {FilterBuilder, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  requestBody,
} from '@loopback/rest';
import {Customer, FunnelAnswers, FunnelToken} from '../models';
import {FunnelTokenRepository} from '../repositories';

type NextRequest = {
  code: string;
  answer: string;
};

export class FunnelTokenCustomerController {
  constructor(
    @repository(FunnelTokenRepository)
    public funnelTokenRepository: FunnelTokenRepository,
  ) {}

  @get('/funnel-tokens/{token}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to FunnelToken',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.string('token') token: typeof FunnelToken.prototype.token,
  ): Promise<Customer> {
    const filter = new FilterBuilder<FunnelToken>().where({token}).build();
    const funnelToken = await this.funnelTokenRepository.findOne(filter);
    if (funnelToken) {
      return this.funnelTokenRepository.customer(funnelToken.id);
    }

    throw new HttpErrors.NotFound(`Invalid Token`);
  }

  @get('/funnel-tokens/token/{token}', {
    responses: {
      '200': {
        description: 'FunnelToken',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FunnelToken),
          },
        },
      },
    },
  })
  async getFunnelToken(
    @param.path.string('token') token: typeof FunnelToken.prototype.token,
  ): Promise<FunnelToken> {
    const filter = new FilterBuilder<FunnelToken>().where({token}).build();
    const funnelToken = await this.funnelTokenRepository.findOne(filter);
    if (funnelToken) {
      return funnelToken;
    }

    throw new HttpErrors.NotFound(`Invalid Token`);
  }

  @post('/funnel-tokens/{token}/next', {
    responses: {
      '200': {
        description: 'Next Question',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
    },
  })
  async next(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
              },
              answer: {
                type: 'string',
              },
            },
          },
        },
      },
    })
    body: NextRequest,
    @param.path.string('token') token: typeof FunnelToken.prototype.token,
  ): Promise<{result: boolean}> {
    const filter = new FilterBuilder<FunnelToken>().where({token}).build();
    const item = await this.funnelTokenRepository.findOne(filter);
    if (item) {
      item.currentQuestion = body.code;
      await this.funnelTokenRepository
        .funnelAnswers(item.getId())
        .create(new FunnelAnswers({code: body.code, answer: body.answer}));
      await this.funnelTokenRepository.save(item);
      return {result: true};
    }

    throw new HttpErrors.NotFound(`Invalid Token`);
  }

  @post('/funnel-tokens/{token}/finish', {
    responses: {
      '200': {
        description: 'Finish Question',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
    },
  })
  async finish(
    @param.path.string('token') token: typeof FunnelToken.prototype.token,
  ): Promise<{result: boolean}> {
    const filter = new FilterBuilder<FunnelToken>().where({token}).build();
    const item = await this.funnelTokenRepository.findOne(filter);
    if (item) {
      item.hasFinished = true;
      await this.funnelTokenRepository.save(item);
      return {result: true};
    }

    throw new HttpErrors.NotFound(`Invalid Token`);
  }
}
