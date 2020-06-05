import {Entity, model, property} from '@loopback/repository';

@model()
export class FunnelAnswers extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  code: string;

  @property({
    type: 'string',
  })
  answer: string;

  @property({
    type: 'number',
  })
  funnelTokenId?: number;

  constructor(data?: Partial<FunnelAnswers>) {
    super(data);
  }
}

export interface FunnelAnswersRelations {
  // describe navigational properties here
}

export type FunnelAnswersWithRelations = FunnelAnswers & FunnelAnswersRelations;
