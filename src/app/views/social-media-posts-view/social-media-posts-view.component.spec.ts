import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaInfoService } from 'src/app/services/common/social-media-info.service';
import { SocialMediaPostsViewComponent } from './social-media-posts-view.component';

describe('SocialMediaPostsComponent', () => {
  let component: SocialMediaPostsViewComponent;
  let fixture: ComponentFixture<SocialMediaPostsViewComponent>;

  let socialMediaInfoServiceStub;

  beforeEach(async () => {
    socialMediaInfoServiceStub = jasmine.createSpyObj('socialMediaInfoserviceStub', ['']);
    await TestBed.configureTestingModule({
      declarations: [SocialMediaPostsViewComponent],
      providers: [
        {
          provide: SocialMediaInfoService,
          useValue: socialMediaInfoServiceStub
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaPostsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
