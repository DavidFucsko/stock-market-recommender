import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRatingViewComponent } from './stock-rating-view.component';
import { StockRatingResultsComponent } from '../../components/stock-rating/stock-rating-results/stock-rating-results.component';
import { StockSelectorComponent } from '../../components/stock-rating/stock-selector/stock-selector.component';
import { SharedComponentsModule } from '../../components/shared/shared-components.module';



@NgModule({
  declarations: [StockRatingViewComponent, StockRatingResultsComponent, StockSelectorComponent],
  imports: [
    CommonModule,
    SharedComponentsModule
  ],
  exports: [StockRatingViewComponent, StockRatingResultsComponent, StockSelectorComponent]
})
export class StockRatingViewModule { }
