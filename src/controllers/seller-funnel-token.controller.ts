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
  Seller,
  FunnelToken,
} from '../models';
import {SellerRepository} from '../repositories';

export class SellerFunnelTokenController {
  constructor(
    @repository(SellerRepository) protected sellerRepository: SellerRepository,
  ) { }

  @get('/sellers/{id}/funnel-tokens', {
    responses: {
      '200': {
        description: 'Array of Seller has many FunnelToken',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FunnelToken)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FunnelToken>,
  ): Promise<FunnelToken[]> {
    return this.sellerRepository.funnelTokens(id).find(filter);
  }

  @post('/sellers/{id}/funnel-tokens', {
    responses: {
      '200': {
        description: 'Seller model instance',
        content: {'application/json': {schema: getModelSchemaRef(FunnelToken)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Seller.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FunnelToken, {
            title: 'NewFunnelTokenInSeller',
            exclude: ['id'],
            optional: ['sellerId']
          }),
        },
      },
    }) funnelToken: Omit<FunnelToken, 'id'>,
  ): Promise<FunnelToken> {
    return this.sellerRepository.funnelTokens(id).create(funnelToken);
  }

  @patch('/sellers/{id}/funnel-tokens', {
    responses: {
      '200': {
        description: 'Seller.FunnelToken PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FunnelToken, {partial: true}),
        },
      },
    })
    funnelToken: Partial<FunnelToken>,
    @param.query.object('where', getWhereSchemaFor(FunnelToken)) where?: Where<FunnelToken>,
  ): Promise<Count> {
    return this.sellerRepository.funnelTokens(id).patch(funnelToken, where);
  }

  @del('/sellers/{id}/funnel-tokens', {
    responses: {
      '200': {
        description: 'Seller.FunnelToken DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FunnelToken)) where?: Where<FunnelToken>,
  ): Promise<Count> {
    return this.sellerRepository.funnelTokens(id).delete(where);
  }
}
