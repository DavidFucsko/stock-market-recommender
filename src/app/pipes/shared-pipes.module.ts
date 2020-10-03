import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingPipePipe } from './rating-pipe.pipe';



@NgModule({
  declarations: [RatingPipePipe],
  imports: [
    CommonModule
  ],
  exports: [RatingPipePipe]
})
export class SharedPipesModule { }
