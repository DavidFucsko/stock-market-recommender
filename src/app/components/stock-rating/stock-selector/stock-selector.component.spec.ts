import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { SharedComponentsModule } from '../../shared/shared-components.module';

import { StockSelectorComponent } from './stock-selector.component';

describe('StockSelectorComponent', () => {
  let component: StockSelectorComponent;
  let fixture: ComponentFixture<StockSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SharedComponentsModule, DirectivesModule],
      declarations: [StockSelectorComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
