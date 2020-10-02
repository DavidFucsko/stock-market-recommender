import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRatingViewComponent } from './stock-rating-view.component';

describe('StockRatingViewComponent', () => {
  let component: StockRatingViewComponent;
  let fixture: ComponentFixture<StockRatingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockRatingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRatingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
