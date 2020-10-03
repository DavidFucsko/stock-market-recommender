import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { DataDisplayComponent } from './data-display/data-display.component';



@NgModule({
  declarations: [TabsComponent, DataDisplayComponent],
  imports: [
    CommonModule
  ],
  exports: [TabsComponent, DataDisplayComponent]
})
export class SharedComponentsModule { }
