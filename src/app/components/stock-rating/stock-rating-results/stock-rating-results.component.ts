import { Component, Input, OnInit } from '@angular/core';
import { StockSearchResult } from 'src/app/models/stock-search-results.model';

@Component({
  selector: 'app-stock-rating-results',
  templateUrl: './stock-rating-results.component.html',
  styleUrls: ['./stock-rating-results.component.scss']
})
export class StockRatingResultsComponent implements OnInit {

  @Input()
  stockSearchResults: StockSearchResult;

  constructor() { }

  ngOnInit(): void {
  }

}
