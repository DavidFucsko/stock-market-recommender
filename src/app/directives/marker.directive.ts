import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTabMarker]'
})
export class TabMarkerDirective {

  @Input('appTabMarker') markerReference: { markerName: string, referenceName: string };
  constructor(public templateRef: TemplateRef<any>) { }

}
