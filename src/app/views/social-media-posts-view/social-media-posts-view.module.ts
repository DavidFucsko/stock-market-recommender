import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SocialMediaPostsViewComponent } from './social-media-posts-view.component';
import { SocialMediaPostsComponent } from '../../components/social-media-posts/social-media-posts.component';
import { SharedComponentsModule } from 'src/app/components/shared/shared-components.module';

@NgModule({
  declarations: [SocialMediaPostsViewComponent, SocialMediaPostsComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ReactiveFormsModule
  ],
  exports: [SocialMediaPostsViewComponent]
})
export class SocialMediaPostsViewModule { }
