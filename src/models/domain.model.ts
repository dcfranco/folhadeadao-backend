import {belongsTo, Entity, model, property} from '@loopback/repository';
import {DomainType} from './domain-type.model';

@model()
export class Domain extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'string',
  })
  imageUrl?: string;

  @property({
    type: 'number',
  })
  questionId?: number;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  @property({
    type: 'string',
    required: true,
  })
  label: string;

  @property({
    type: 'string',
    required: true,
  })
  tagReference: string;

  @property({
    type: 'string',
  })
  className?: string;

  @belongsTo(() => DomainType)
  domainTypeId: number;

  constructor(data?: Partial<Domain>) {
    super(data);
  }
}

export interface DomainRelations {
}

export type DomainWithRelations = Domain & DomainRelations;
