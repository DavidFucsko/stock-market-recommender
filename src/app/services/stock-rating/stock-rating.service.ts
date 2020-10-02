import { Injectable } from '@angular/core';
import { StockRatingViewModule } from '../../views/stock-rating-view/stock-rating-view.module';

@Injectable({
  providedIn: StockRatingViewModule
})
export class StockRatingService {

  constructor() { }
}
