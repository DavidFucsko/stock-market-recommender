import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaInfoService } from 'src/app/services/common/social-media-info.service';
import { StockRatingService } from 'src/app/services/stock-rating/stock-rating.service';
import { StockRatingViewComponent } from './stock-rating-view.component';

describe('StockRatingViewComponent', () => {
  let component: StockRatingViewComponent;
  let fixture: ComponentFixture<StockRatingViewComponent>;
  let stockRatingServiceStub;
  let socialMediaInfoserviceStub;

  beforeEach(async () => {
    stockRatingServiceStub = jasmine.createSpyObj('stockRatingServiceStub', ['']);
    socialMediaInfoserviceStub = jasmine.createSpyObj('socialMediaInfoserviceStub', ['']);
    await TestBed.configureTestingModule({
      declarations: [StockRatingViewComponent],
      providers: [
        {
          provide: StockRatingService,
          useValue: stockRatingServiceStub
        },
        {
          provide: SocialMediaInfoService,
          useValue: socialMediaInfoserviceStub
        }]
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
