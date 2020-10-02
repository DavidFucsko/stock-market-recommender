import { Component, ContentChildren, TemplateRef, QueryList, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { TabMarkerDirective } from 'src/app/directives/marker.directive';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabMarkerDirective) templates: QueryList<TabMarkerDirective>;

  @Output()
  tabSelected: EventEmitter<string> = new EventEmitter<string>();

  selectedTemplate: TemplateRef<any>;

  constructor() { }

  ngAfterContentInit(): void {
    if (!!this.templates.length) {
      this.selectTemplate(
        {
          templateRef: this.templates.first.templateRef,
          referenceName: this.templates.first.markerReference.referenceName
        });
    }
  }

  selectTemplate(selected: { templateRef: TemplateRef<any>, referenceName: string }): void {
    this.selectedTemplate = selected.templateRef;
    this.tabSelected.emit(selected.referenceName)
  }

  isActive(selectedTemplate: TemplateRef<any>): boolean {
    return selectedTemplate === this.selectedTemplate;
  }

}
