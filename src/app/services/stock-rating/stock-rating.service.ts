import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SearchStockParamters } from 'src/app/models/search-stock-parameters.model';
import { SocialMediaCount } from 'src/app/models/social-media-count.model';
import { SocialPlatforms } from 'src/app/models/social-platforms.model';
import { StockPriceModel } from 'src/app/models/stock-price.model';
import { StockSearchResult } from 'src/app/models/stock-search-results.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockRatingService {

  public latestCombinedSearchResults: StockSearchResult;

  constructor(private httpClient: HttpClient) { }

  stockPriceGenerator(searchParamters: SearchStockParamters): Observable<StockPriceModel[]> {
    let stockPriceGeneratorParams = new HttpParams();
    stockPriceGeneratorParams = stockPriceGeneratorParams.append(
      'stockSymbol', searchParamters.stockSymbol);
    stockPriceGeneratorParams = stockPriceGeneratorParams.append(
      'fromDate', new Date(searchParamters.fromDate).toISOString().substring(0, 10));
    stockPriceGeneratorParams = stockPriceGeneratorParams.append(
      'toDate', new Date(searchParamters.toDate).toISOString().substring(0, 10));


    return this.httpClient.get<StockPriceModel[]>(
      `${environment.backendUrl}${environment.backendEndpoints[0]}`,
      { params: stockPriceGeneratorParams }).pipe(
        catchError(_ => of([])));
  }

  socialMediaCountGenerator(searchParamters: SearchStockParamters): Observable<SocialMediaCount[]> {
    let socialMediaCountParams = new HttpParams();
    socialMediaCountParams = socialMediaCountParams.append(
      'stockSymbol', searchParamters.stockSymbol);
    socialMediaCountParams = socialMediaCountParams.append(
      'fromDate', new Date(searchParamters.fromDate).toISOString().substring(0, 10));
    socialMediaCountParams = socialMediaCountParams.append(
      'toDate', new Date(searchParamters.toDate).toISOString().substring(0, 10));

    return this.httpClient.get<SocialMediaCount[]>(
      `${environment.backendUrl}${environment.backendEndpoints[1]}`,
      { params: socialMediaCountParams }).pipe(
        catchError(_ => of([])));
  }

  recommendationAlgorithm(
    stockPrices: number[],
    socialMediaCounts: number[],
    algorithmToUse: string = 'naive',
    ...additionalParams): Observable<number[]> {

    const body = { stockPrices, socialMediaCounts, algorithmToUse, additionalParams };

    return this.httpClient.post<number[]>(`${environment.backendUrl}${environment.backendEndpoints[2]}`, body)
      .pipe(catchError(_ => of([])));
  }

  searchStock(searchParameters: SearchStockParamters): Observable<StockSearchResult> {
    return forkJoin({
      stockPrices: this.stockPriceGenerator(searchParameters),
      socialMediaCounts: this.socialMediaCountGenerator(searchParameters)
    }).pipe(
      map(result => {
        const combinedResults: StockSearchResult = new StockSearchResult();
        const combinedStockPrices = [];
        const combinedDayOfTrades = [];
        const combinedSocialMediaCounts: number[] = this.filterBySocialMediaPlatforms(result.socialMediaCounts, searchParameters);
        result.stockPrices.forEach((stockPrice) => {
          combinedStockPrices.push(stockPrice.price);
          combinedDayOfTrades.push(stockPrice.dayOfTrade);
        });
        combinedResults.cumulatedSocialMediaCounts = combinedSocialMediaCounts;
        combinedResults.stockPrices = combinedStockPrices;
        combinedResults.dayOfTrades = combinedDayOfTrades;
        combinedResults.socialMediaCounts = result.socialMediaCounts;
        this.latestCombinedSearchResults = combinedResults;
        return combinedResults;
      }),
      switchMap(
        combinedResults => this.recommendationAlgorithm(
          combinedResults.stockPrices,
          combinedResults.cumulatedSocialMediaCounts, searchParameters.algorithmToUse, searchParameters.additionalParams).pipe(
            map(response => ({ ...combinedResults, ...{ stockRatings: response } })))
      ),
      catchError(_ => of(new StockSearchResult()))
    );
  }

  runRecommendationAlgorithm(searcParams: SearchStockParamters): Observable<StockSearchResult> {

    const socialMediaParamteres = { facebook: searcParams.facebook, twitter: searcParams.twitter, instagram: searcParams.instagram };
    if (!!this.latestCombinedSearchResults) {
      const filteredSocialMediaCounts = this.filterBySocialMediaPlatforms(
        this.latestCombinedSearchResults.socialMediaCounts, socialMediaParamteres);
      return this.recommendationAlgorithm(
        this.latestCombinedSearchResults.stockPrices,
        filteredSocialMediaCounts,
        searcParams.algorithmToUse, searcParams.additionalParams).pipe(
          map(response => (
            { ...this.latestCombinedSearchResults, ...{ stockRatings: response, cumulatedSocialMediaCounts: filteredSocialMediaCounts } }))
        );
    }

    return of(new StockSearchResult());
  }

  private filterBySocialMediaPlatforms(socialMediaCounts: SocialMediaCount[], socialMediaParamteres: SocialPlatforms): number[] {
    const combinedSocialMediaCounts = [];
    socialMediaCounts.forEach(socialMediaCount => {
      combinedSocialMediaCounts.push(socialMediaCount.socialMediaCounts
        .filter(countByType => socialMediaParamteres[countByType.mediaType])
        .reduce((previous, countByType) => (previous += countByType.count), 0));
    });

    return combinedSocialMediaCounts;
  }
}
