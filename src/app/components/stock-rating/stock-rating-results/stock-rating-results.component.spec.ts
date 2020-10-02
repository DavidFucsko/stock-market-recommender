import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRatingResultsComponent } from './stock-rating-results.component';

describe('StockRatingResultsComponent', () => {
  let component: StockRatingResultsComponent;
  let fixture: ComponentFixture<StockRatingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockRatingResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRatingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
