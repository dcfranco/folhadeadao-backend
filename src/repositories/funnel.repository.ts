import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Funnel, FunnelRelations, Question} from '../models';
import {QuestionRepository} from './question.repository';

export class FunnelRepository extends DefaultCrudRepository<
  Funnel,
  typeof Funnel.prototype.id,
  FunnelRelations
> {

  public readonly questions: HasManyRepositoryFactory<Question, typeof Funnel.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('QuestionRepository') protected questionRepositoryGetter: Getter<QuestionRepository>,
  ) {
    super(Funnel, dataSource);
    this.questions = this.createHasManyRepositoryFactoryFor('questions', questionRepositoryGetter,);
    this.registerInclusionResolver('questions', this.questions.inclusionResolver);
  }
}
