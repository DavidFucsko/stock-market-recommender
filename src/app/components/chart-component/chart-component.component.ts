import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { StockSearchResult } from 'src/app/models/stock-search-results.model';
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.scss']
})
export class ChartComponent implements OnChanges {

  @Input()
  stockSearchResults: StockSearchResult;

  constructor() { }

  ngOnChanges(changes): void {
    if (!!changes['stockSearchResults'] && !!this.stockSearchResults) {
      const dataPoints = [
      ];
      this.stockSearchResults.stockPrices.forEach((price, index) => {
        dataPoints.push({ ...{ y: price }, ...this.findLabelForDatapoint(this.stockSearchResults.stockRatings[index]) });
      });
      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        responsive: true,
        maintainAspectRatio: false,
        indexLabelFontSize: 16,
        data: [{
          type: 'line',
          dataPoints
        }]
      });
      chart.render();
    }
  }

  private findLabelForDatapoint(rating: number): { indexLabel: string, markerColor: string, markerType: string } {
    const buy = { indexLabel: '\u2191 buy', markerColor: 'green', markerType: 'triangle' };
    const hold = { indexLabel: '\u25C7 hold', markerColor: 'DarkSlateGrey', markerType: 'circle' };
    const sell = { indexLabel: '\u2193 sell', markerColor: 'red', markerType: 'cross' };

    return rating === 2 ? sell : rating === 1 ? hold : buy;
  }

}
