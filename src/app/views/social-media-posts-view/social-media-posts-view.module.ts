import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaPostsViewComponent } from './social-media-posts-view.component';
import { SocialMediaPostsComponent } from '../../components/social-media-posts/social-media-posts.component';

@NgModule({
  declarations: [SocialMediaPostsViewComponent, SocialMediaPostsComponent],
  imports: [
    CommonModule
  ],
  exports: [SocialMediaPostsViewComponent]
})
export class SocialMediaPostsViewModule { }
