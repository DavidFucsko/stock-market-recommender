import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SearchStockParamters } from 'src/app/models/search-stock-parameters.model';
import { StockSearchResult } from 'src/app/models/stock-search-results.model';
import { StockRatingService } from 'src/app/services/stock-rating/stock-rating.service';

@Component({
  selector: 'app-stock-rating-view',
  templateUrl: './stock-rating-view.component.html',
  styleUrls: ['./stock-rating-view.component.scss']
})
export class StockRatingViewComponent implements OnInit {

  stockSearchResults$: Observable<StockSearchResult>;

  constructor(private stockRatingService: StockRatingService) { }

  ngOnInit(): void {
  }

  searchStock(searchParameters: SearchStockParamters): void {
    this.stockSearchResults$ = this.stockRatingService.searchStock(searchParameters).pipe(tap(console.log));
  }

  socialSelectorChanged(changes: SearchStockParamters): void {
    this.stockSearchResults$ = this.stockRatingService.runRecommendationAlgorithm(changes).pipe(tap(console.log));
  }
}
