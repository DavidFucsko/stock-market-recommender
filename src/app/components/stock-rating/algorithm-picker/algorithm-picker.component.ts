import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-algorithm-picker',
  templateUrl: './algorithm-picker.component.html',
  styleUrls: ['./algorithm-picker.component.scss']
})
export class AlgorithmPickerComponent implements AfterViewInit {
  private selectedAlgorithmName: string;
  private algorithmAdditionalParamsMap: Map<string, QueryList<ElementRef>> = new Map<string, QueryList<ElementRef>>();
  @ViewChildren('advanced') advancedInputs: QueryList<ElementRef>;
  @ViewChildren('naive') naiveInputs: QueryList<ElementRef>;

  @Output()
  algorithmChanged: EventEmitter<{ algorithm: string, additionalParams: string[] }> = new EventEmitter();

  constructor() { }

  ngAfterViewInit(): void {
    this.algorithmAdditionalParamsMap.set('advanced', this.advancedInputs);
    this.algorithmAdditionalParamsMap.set('naive', this.naiveInputs);

  }
  algorithmSelected(algorithmName: string): void {
    this.selectedAlgorithmName = algorithmName;
    setTimeout(this.inputChanged.bind(this), 0);
  }

  inputChanged(): void {
    const additionalParams = this.algorithmAdditionalParamsMap.get(this.selectedAlgorithmName);
    const values = [];
    if (!!additionalParams && !!additionalParams.length) {
      additionalParams.forEach(element => values.push(element.nativeElement.value));
    }
    this.algorithmChanged.emit({ algorithm: this.selectedAlgorithmName, additionalParams: values });
  }

}
