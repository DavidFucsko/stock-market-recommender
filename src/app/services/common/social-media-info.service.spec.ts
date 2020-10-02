import { TestBed } from '@angular/core/testing';

import { SocialMediaInfoService } from './social-media-info.service';

describe('SocialMediaInfoService', () => {
  let service: SocialMediaInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialMediaInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
