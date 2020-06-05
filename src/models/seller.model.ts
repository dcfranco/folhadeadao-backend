import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {FunnelToken} from './funnel-token.model';

@model()
export class Seller extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @belongsTo(() => User)
  userId: number;

  @property({
    type: 'number',
  })
  funnelTokenId?: number;

  @hasMany(() => FunnelToken)
  funnelTokens: FunnelToken[];

  constructor(data?: Partial<Seller>) {
    super(data);
  }
}

export interface SellerRelations {}

export type SellerWithRelations = Seller & SellerRelations;
