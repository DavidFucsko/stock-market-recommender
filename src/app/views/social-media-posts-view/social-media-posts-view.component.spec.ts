import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaPostsViewComponent } from './social-media-posts-view.component';

describe('SocialMediaPostsComponent', () => {
  let component: SocialMediaPostsViewComponent;
  let fixture: ComponentFixture<SocialMediaPostsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialMediaPostsViewComponent]
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
