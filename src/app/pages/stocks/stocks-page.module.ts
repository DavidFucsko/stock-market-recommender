import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksPageComponent } from './stocks-page.component';
import { StocksPageRoutingModule } from './stocks-page-routing.module';
import { SocialMediaPostsViewModule } from '../../views/social-media-posts-view/social-media-posts-view.module';
import { StockRatingViewModule } from '../../views/stock-rating-view/stock-rating-view.module';

@NgModule({
  declarations: [StocksPageComponent],
  imports: [
    CommonModule,
    StocksPageRoutingModule,
    SocialMediaPostsViewModule,
    StockRatingViewModule
  ]
})
export class StocksPageModule { }
