import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Customer} from './customer.model';
import {Seller} from './seller.model';
import {FunnelAnswers} from './funnel-answers.model';

@model()
export class FunnelToken extends Entity {
  @property({
    id: true,
    type: 'Number',
    required: false,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  token: string;

  @property({
    type: 'Date',
    postgresql: {
      columnName: 'createdAt',
      dataType: 'timestamp with time zone',
    },
  })
  createdAt: Date;

  @property({
    type: 'string',
  })
  currentQuestion: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  hasFinished: boolean;

  @belongsTo(() => Customer)
  customerId: number;

  @belongsTo(() => Seller)
  sellerId?: number;

  @hasMany(() => FunnelAnswers)
  funnelAnswers: FunnelAnswers[];

  constructor(data?: Partial<FunnelToken>) {
    super(data);
  }
}

export interface FunnelTokenRelations {
  // describe navigational properties here
}

export type FunnelTokenWithRelations = FunnelToken & FunnelTokenRelations;
