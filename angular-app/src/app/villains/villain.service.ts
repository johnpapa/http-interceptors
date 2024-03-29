import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Villain } from '../core';

@Injectable({ providedIn: 'root' })
export class VillainService extends EntityCollectionServiceBase<Villain> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Villain', serviceElementsFactory);
  }
}
