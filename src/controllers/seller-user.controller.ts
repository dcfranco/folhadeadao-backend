import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Seller,
  User,
} from '../models';
import {SellerRepository} from '../repositories';

export class SellerUserController {
  constructor(
    @repository(SellerRepository)
    public sellerRepository: SellerRepository,
  ) { }

  @get('/sellers/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Seller',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Seller.prototype.id,
  ): Promise<User> {
    return this.sellerRepository.user(id);
  }
}
