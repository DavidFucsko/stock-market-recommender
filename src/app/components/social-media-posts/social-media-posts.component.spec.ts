import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { SharedComponentsModule } from '../shared/shared-components.module';

import { SocialMediaPostsComponent } from './social-media-posts.component';

describe('SocialMediaPostsComponent', () => {
  let component: SocialMediaPostsComponent;
  let fixture: ComponentFixture<SocialMediaPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SharedComponentsModule, DirectivesModule],
      declarations: [SocialMediaPostsComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
