import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabMarkerDirective } from './marker.directive';

@NgModule({
  declarations: [TabMarkerDirective],
  imports: [
    CommonModule
  ],
  exports: [TabMarkerDirective]
})
export class DirectivesModule { }
