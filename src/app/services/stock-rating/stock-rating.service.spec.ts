import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StockRatingService } from './stock-rating.service';
import { SearchStockParamters } from 'src/app/models/search-stock-parameters.model';
import { StockPriceModel } from 'src/app/models/stock-price.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SocialMediaCount } from 'src/app/models/social-media-count.model';
import { StockSearchResult } from 'src/app/models/stock-search-results.model';

describe('StockRatingService', () => {
  let service: StockRatingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockRatingService]
    });
    service = TestBed.inject(StockRatingService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('stockPriceGenerator', () => {
    it('should return an Observable<StockPriceModel[]>', () => {
      const dummyResponse = [
        new StockPriceModel()
      ];
      service.stockPriceGenerator(new SearchStockParamters()).subscribe(prices => {
        expect(prices.length).toBe(1);
        expect(prices).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne('http://localhost:4200/stockPriceGenerator?stockSymbol=&fromDate=2020-10-03&toDate=2020-10-03');
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
    it('should return an empty array if failed', () => {
      service.stockPriceGenerator(new SearchStockParamters()).subscribe(() => { }, prices => {
        expect(prices.length).toBe(0);
      });

      const req = httpMock.expectOne('http://localhost:4200/stockPriceGenerator?stockSymbol=&fromDate=2020-10-03&toDate=2020-10-03');
      req.flush(new HttpErrorResponse({ error: 'Bad Request', status: 400 }));
    });
  });

  describe('socialMediaCountGenerator', () => {
    it('should return an Observable<StockPriceModel[]>', () => {
      const dummyResponse = [
        new SocialMediaCount()
      ];
      service.socialMediaCountGenerator(new SearchStockParamters()).subscribe(counts => {
        expect(counts.length).toBe(1);
        expect(counts).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne('http://localhost:4200/socialMediaCountGenerator?stockSymbol=&fromDate=2020-10-03&toDate=2020-10-03');
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
    it('should return an empty array if failed', () => {
      service.socialMediaCountGenerator(new SearchStockParamters()).subscribe(() => { }, prices => {
        expect(prices.length).toBe(0);
      });

      const req = httpMock.expectOne('http://localhost:4200/socialMediaCountGenerator?stockSymbol=&fromDate=2020-10-03&toDate=2020-10-03');
      req.flush(new HttpErrorResponse({ error: 'Bad Request', status: 400 }));
    });
  });

  describe('recommendationAlgorithm', () => {
    it('should return an array of numbers', () => {
      const dummyResponse = [
        1
      ];
      service.recommendationAlgorithm([1], [1]).subscribe(numbers => {
        expect(numbers.length).toBe(1);
        expect(numbers).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne('http://localhost:4200/recommendationAlgorithm');
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });

    it('should return an empty array if failed', () => {
      service.recommendationAlgorithm([1], [1]).subscribe(() => { }, numbers => {
        expect(numbers.length).toBe(0);
      });

      const req = httpMock.expectOne('http://localhost:4200/recommendationAlgorithm');
      req.flush(new HttpErrorResponse({ error: 'Bad Request', status: 400 }));
    });
  });

  describe('searchStock', () => {
    it('should return the StockSearch Results', () => {
      const dummyResponse = {
        stockPrices: [0],
        cumulatedSocialMediaCounts: [0],
        dayOfTrades: [new Date()],
        stockRatings: [1],
        socialMediaCounts: [new SocialMediaCount()],
        stockName: '',
        algorithm: 'naive'
      };
      const dummyRecommendationResponse = [
        1
      ];
      const dummySocialMediaResponse = [
        new SocialMediaCount()
      ];
      const dummyStockResponse = [
        new StockPriceModel()
      ];
      service.searchStock(new SearchStockParamters()).subscribe(result => {
        expect(result).toEqual(dummyResponse);
      });

      const stockPirceRequest = httpMock.expectOne('http://localhost:4200/stockPriceGenerator?stockSymbol=&fromDate=2020-10-03&toDate=2020-10-03');
      expect(stockPirceRequest.request.method).toBe('GET');
      stockPirceRequest.flush(dummyStockResponse);
      const socialMediaCountRequest = httpMock.expectOne('http://localhost:4200/socialMediaCountGenerator?stockSymbol=&fromDate=2020-10-03&toDate=2020-10-03');
      expect(socialMediaCountRequest.request.method).toBe('GET');
      socialMediaCountRequest.flush(dummySocialMediaResponse);
      const recommendationRequest = httpMock.expectOne('http://localhost:4200/recommendationAlgorithm');
      expect(recommendationRequest.request.method).toBe('POST');
      recommendationRequest.flush(dummyRecommendationResponse);
    });
    it('should return an empty array if failed', () => {
      const dummyResponse = new StockSearchResult();
      service.searchStock(new SearchStockParamters()).subscribe(() => { }, result => {
        expect(result).toEqual(dummyResponse);
      });
      const stockPirceRequest = httpMock.expectOne('http://localhost:4200/stockPriceGenerator?stockSymbol=&fromDate=2020-10-03&toDate=2020-10-03');
      expect(stockPirceRequest.request.method).toBe('GET');
      stockPirceRequest.flush(new HttpErrorResponse({ error: 'Bad Request', status: 400 }));
      const socialMediaCountRequest = httpMock.expectOne('http://localhost:4200/socialMediaCountGenerator?stockSymbol=&fromDate=2020-10-03&toDate=2020-10-03');
      expect(socialMediaCountRequest.request.method).toBe('GET');
    });
  });

  describe('runRecommendationAlgorithm', () => {
    it('should return  Observable<StockSearchResult> if there are search results already', () => {
      service.latestCombinedSearchResults = {
        stockPrices: [0],
        cumulatedSocialMediaCounts: [0],
        dayOfTrades: [new Date()],
        stockRatings: [1],
        socialMediaCounts: [new SocialMediaCount()],
        algorithm: 'naive',
        stockName: ''
      };
      const dummyResponse = [
        1
      ];
      service.runRecommendationAlgorithm(new SearchStockParamters()).subscribe(result => {
        expect(result).toEqual(service.latestCombinedSearchResults);
      });

      const req = httpMock.expectOne('http://localhost:4200/recommendationAlgorithm');
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });
});
