import {repository} from '@loopback/repository';
import {get, HttpErrors} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class SetupController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/setup', {
    responses: {
      '203': {
        description: 'Setup',
      },
    },
  })
  async setup(): Promise<void> {
    const password = 'admin';

    try {
      const admin = await this.userRepository.create(new User({
        email: 'marloncristiano@icloud.com',
        name: 'Marlon Cristiano',
        cpf: '046.316.239-00',
        username: 'admin',
        isAdmin: true,
        isBlocked: false,
      }));

      await this.userRepository
        .userCredentials(admin.id)
        .create({password});

    } catch (error) {
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value import {  } from "module"; already taken');
      } else {
        throw error;
      }
    }
  }
}
