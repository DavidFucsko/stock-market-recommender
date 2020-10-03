import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

@Component({
  selector: 'app-test-cmp',
  template: `<app-tabs>
      <div *appTabMarker="{markerName: 'Test1', referenceName: 'test1'}"></div>
      <div *appTabMarker="{markerName: 'Test2', referenceName: 'test2'}"></div>
</app-tabs>`,
})
class TestWrapperComponent { }

describe('TabViewComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectivesModule],
      declarations: [TabsComponent, TestWrapperComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.templates.length).toEqual(2);
  });

  describe('run only', () => {
    it('should select the first tab by default', () => {
      const nativeElement = fixture.nativeElement;
      const tabLabel = nativeElement.querySelector('.tab-label--active');
      expect(tabLabel.textContent.trim()).toEqual('Test1');
    });
  });
});
