import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmPickerComponent } from './algorithm-picker/algorithm-picker.component';



@NgModule({
  declarations: [AlgorithmPickerComponent],
  imports: [
    CommonModule
  ],
  exports: [AlgorithmPickerComponent]
})
export class SharedComponentsModule { }
