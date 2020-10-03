import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchStockParamters } from 'src/app/models/search-stock-parameters.model';
import { SocialMediaPost } from 'src/app/models/social-media-post.model';

import { SocialMediaInfoService } from './social-media-info.service';

describe('SocialMediaInfoService', () => {
  let service: SocialMediaInfoService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SocialMediaInfoService]
    });
    service = TestBed.inject(SocialMediaInfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSocialMediaPosts', () => {
    it('should return array of social media posts', () => {
      const dummyResponse = [
        new SocialMediaPost()
      ];
      service.selectedSocialMediaPlatforms = { twitter: true, facebook: false, instagram: false };
      service.getSocialMediaPosts('1').subscribe(posts => {
        expect(posts.length).toBe(1);
        expect(posts).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne('http://localhost:4200/twitter?numberOfPosts=1');
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
    it('should return empty array if failed', () => {
      service.selectedSocialMediaPlatforms = { twitter: true, facebook: false, instagram: false };
      service.getSocialMediaPosts('1').subscribe(() => { }, prices => {
        expect(prices.length).toBe(0);
      });

      const req = httpMock.expectOne('http://localhost:4200/twitter?numberOfPosts=1');
      req.flush(new HttpErrorResponse({ error: 'Bad Request', status: 400 }));
    });
  });

  describe('socialSelectorsChanged', () => {
    it('should set the social selectors if changed', () => {
      const changes = { twitter: true, facebook: false, instagram: false } as SearchStockParamters;
      service.socialSelectorsChanged(changes);

      expect(service.selectedSocialMediaPlatforms).toEqual(changes);
    });
  });
});
