import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StockRatingViewComponent } from './stock-rating-view.component';
import { StockRatingResultsComponent } from '../../components/stock-rating/stock-rating-results/stock-rating-results.component';
import { StockSelectorComponent } from '../../components/stock-rating/stock-selector/stock-selector.component';
import { SharedComponentsModule } from '../../components/shared/shared-components.module';
import { AlgorithmPickerComponent } from 'src/app/components/stock-rating/algorithm-picker/algorithm-picker.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { ChartComponent } from 'src/app/components/chart-component/chart-component.component';



@NgModule({
  declarations: [
    StockRatingViewComponent,
    StockRatingResultsComponent,
    StockSelectorComponent,
    AlgorithmPickerComponent,
    ChartComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    SharedPipesModule
  ],
  exports: [StockRatingViewComponent]
})
export class StockRatingViewModule { }
