import {
  Count, CountSchema,
  Filter,
  FilterExcludingWhere, repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,
  requestBody
} from '@loopback/rest';
import {User, UserAdmin, UserClient} from '../../models';
import {UserAdminRepository, UserRepository} from '../../repositories';

export class AdminControllerController {
  constructor(
    @repository(UserAdminRepository)
    public userAdminRepository : UserAdminRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/admins/{id}/user', {
    responses: {
      '200': {
        description: 'UserAdmin model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async createUser(
    @param.path.number('id') id: typeof UserAdmin.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInUserAdmin',
            exclude: ['id', 'name', 'lastLogin', 'email'],
          }),
        },
      },
    }) user: Pick<User, 'username'|'isBlocked'|'isAdmin'>,
  ): Promise<User> {
    const userAdm = await this.userAdminRepository.findById(id, { include: [{ relation: 'user' } ]})
    if (userAdm.user && userAdm.user.id) {
      await this.userRepository.updateById(userAdm.user.id, { isBlocked: false, isAdmin: user.isAdmin })
      return this.userAdminRepository.user(userAdm.email).get()
    }

    const password = 'Trocar123'
    const userModel = await this.userAdminRepository.user(userAdm.email).create({
      name: userAdm.name,
      username: user.username,
      isBlocked: user.isBlocked,
      isAdmin: user.isAdmin
    });

    await this.userRepository
        .userCredentials(userModel.id)
        .create({password});

    return userModel;
  }

  @del('/admins/{id}/user', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteUserById(@param.path.number('id') id: number): Promise<void> {
    const userAdm = await this.userAdminRepository.findById(id)
    await this.userAdminRepository.user(userAdm.email).patch({ isBlocked: true });
  }

  @get('/admins/{id}/clients', {
    responses: {
      '200': {
        description: 'Array of UserAdmin has many UserClient',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserClient)},
          },
        },
      },
    },
  })
  async findClients(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserClient>,
  ): Promise<UserClient[]> {
    return this.userAdminRepository.userClients(id).find(filter);
  }

  @post('/admins/{id}/clients', {
    responses: {
      '200': {
        description: 'UserAdmin model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserClient)}},
      },
    },
  })
  async createClient(
    @param.path.number('id') id: typeof UserAdmin.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserClient, {
            title: 'NewUserClientInUserAdmin',
            exclude: ['ID']
          }),
        },
      },
    }) userClient: Omit<UserClient, 'ID'>,
  ): Promise<UserClient> {
    return this.userAdminRepository.userClients(id).create(userClient);
  }

  @post('/admins', {
    responses: {
      '200': {
        description: 'UserAdmin model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserAdmin)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAdmin, {
            title: 'NewUserAdmin',
            exclude: ['ID'],
          }),
        },
      },
    })
    userAdmin: Omit<UserAdmin, 'ID'>,
  ): Promise<UserAdmin> {
    return this.userAdminRepository.create(userAdmin);
  }

  @get('/admins/count', {
    responses: {
      '200': {
        description: 'UserAdmin model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserAdmin) where?: Where<UserAdmin>,
  ): Promise<Count> {
    return this.userAdminRepository.count(where);
  }

  @get('/admins', {
    responses: {
      '200': {
        description: 'Array of UserAdmin model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserAdmin, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserAdmin) filter?: Filter<UserAdmin>,
  ): Promise<UserAdmin[]> {
    return this.userAdminRepository.find(filter);
  }

  @get('/admins/{id}', {
    responses: {
      '200': {
        description: 'UserAdmin model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserAdmin, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserAdmin, {exclude: 'where'}) filter?: FilterExcludingWhere<UserAdmin>
  ): Promise<UserAdmin> {
    return this.userAdminRepository.findById(id, filter);
  }

  @patch('/admins/{id}', {
    responses: {
      '204': {
        description: 'UserAdmin PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAdmin, {partial: true}),
        },
      },
    })
    userAdmin: UserAdmin,
  ): Promise<void> {
    await this.userAdminRepository.updateById(id, userAdmin);
  }

  @put('/admins/{id}', {
    responses: {
      '204': {
        description: 'UserAdmin PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userAdmin: UserAdmin,
  ): Promise<void> {
    await this.userAdminRepository.replaceById(id, userAdmin);
  }

  @del('/admins/{id}', {
    responses: {
      '204': {
        description: 'UserAdmin DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userAdminRepository.deleteById(id);
  }
}
