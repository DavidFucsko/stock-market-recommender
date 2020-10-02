import { TestBed } from '@angular/core/testing';

import { StockRatingService } from './stock-rating.service';

describe('StockRatingService', () => {
  let service: StockRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
