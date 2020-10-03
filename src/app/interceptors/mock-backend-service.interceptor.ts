import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CountByType } from '../models/count-by-type.model';
import { SocialMediaCount } from '../models/social-media-count.model';
import { SocialMediaPost } from '../models/social-media-post.model';
import { StockPriceModel } from '../models/stock-price.model';


@Injectable()
export class MockBackendServiceInterceptor implements HttpInterceptor {
    private algorithmMap: Map<string, (...args) => number> = new Map(
        [['naive', this.naiveAlgorithm], ['advanced', this.advancedAlgorithm]]
    );

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        switch (request.url.split(environment.backendUrl)[1]) {
            case 'stockPriceGenerator': {
                const stockSymbolParam = request.params.get('stockSymbol');
                return (of(new HttpResponse({
                    body:
                        this.stockPriceGenerator(
                            stockSymbolParam,
                            new Date(request.params.get('fromDate')),
                            new Date(request.params.get('toDate'))
                        ), status: 200
                })));
            }
            case 'socialMediaCountGenerator': {
                const stockSymbol = request.params.get('stockSymbol');
                return (of(new HttpResponse({
                    body: this.socialMediaCountGenerator(
                        stockSymbol,
                        new Date(request.params.get('fromDate')),
                        new Date(request.params.get('toDate'))
                    ), status: 200
                })));
            }
            case 'recommendationAlgorithm':
                {
                    const stockPrice: number[] = request.body['stockPrices'];
                    const socialMediaCount: number[] = request.body['socialMediaCounts'];
                    const algorithmToUse: string = request.body['algorithmToUse'];
                    const additionalParams: any[] = request.body['additionalParams'];
                    return of(new HttpResponse({
                        body: this.recommendationAlgorithm(
                            stockPrice,
                            socialMediaCount,
                            algorithmToUse,
                            additionalParams
                        ), status: 200
                    }));
                }
            case ('twitter'):
                {
                    const numberOfPosts = request.params.get('numberOfPosts');
                    return of(new HttpResponse({
                        body: this.getSocialMediaPosts(numberOfPosts, request.url.split(environment.backendUrl)[1])
                    }));
                }
            case ('facebook'):
                {
                    const numberOfPosts = request.params.get('numberOfPosts');
                    return of(new HttpResponse({
                        body: this.getSocialMediaPosts(numberOfPosts, request.url.split(environment.backendUrl)[1])
                    }));
                }
            case ('instagram'):
                {
                    const numberOfPosts = request.params.get('numberOfPosts');
                    return of(new HttpResponse({
                        body: this.getSocialMediaPosts(numberOfPosts, request.url.split(environment.backendUrl)[1])
                    }));
                }
            default:
                return next.handle(request).pipe(
                    map((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            console.log('event--->>>', event);
                        }
                        return event;
                    }));
        }
    }

    stockPriceGenerator(stockSymbol: string, fromDate: Date, toDate: Date): StockPriceModel[] {
        const response: StockPriceModel[] = [];
        const dayOfTrade = fromDate;
        while (dayOfTrade.getTime() < toDate.getTime()) {
            response.push({ stockSymbol, price: Math.floor((Math.random() * 1001)), dayOfTrade });
            dayOfTrade.setDate(dayOfTrade.getDate() + 1);
        }
        return response;
    }

    socialMediaCountGenerator(stockSymbol: string, fromDate: Date, toDate: Date): SocialMediaCount[] {
        const response: SocialMediaCount[] = [];
        const dayOfTrade = fromDate;
        while (dayOfTrade.getTime() < toDate.getTime()) {
            const socialMediaCountsForDay: CountByType[] = [
                {
                    mediaType: 'facebook',
                    count: Math.floor((Math.random() * 10001))
                },
                {
                    mediaType: 'twitter',
                    count: Math.floor((Math.random() * 10001))
                },
                {
                    mediaType: 'instagram',
                    count: Math.floor((Math.random() * 10001))
                }
            ];
            response.push({ stockSymbol, socialMediaCounts: socialMediaCountsForDay, dayOfTrade });
            dayOfTrade.setDate(dayOfTrade.getDate() + 1);
        }

        return response;
    }

    recommendationAlgorithm(stockPrices: number[], socialMediaCounts: number[], algorithmToUse: string, ...additionalParams): number[] {
        let result: number[] = [];
        result = stockPrices.map((stockPrice, index) => {
            return this.algorithmMap.get(algorithmToUse).call(this, stockPrice, socialMediaCounts[index], additionalParams);
        });
        return result;
    }

    getSocialMediaPosts(numberOfPosts: string, platform: string): SocialMediaPost[] {
        const response: SocialMediaPost[] = [];
        console.log(parseInt(numberOfPosts, 10));
        for (let i = 0; i < parseInt(numberOfPosts, 10); i++) {
            response.push({
                title: `${platform.toUpperCase()} post title`,
                post: 'Lorem ipsum post body text!'
            });
        }
        return response;
    }

    private naiveAlgorithm(stockPrice: number, socialMediaCount: number): number {
        // if stock price higher than social media count per 30 we recommend sell, if equal we recommend hold,
        // else buy it
        return stockPrice > socialMediaCount / 30 ? 2 :
            (stockPrice <= socialMediaCount / 30 && stockPrice > socialMediaCount / 100) ? 1 : 0;
    }

    private advancedAlgorithm(stockPrice: number, socialMediaCount: number, constantFactor: number): number {
        return stockPrice > socialMediaCount / (30 / constantFactor) ? 2 :
            (stockPrice <= socialMediaCount / (30 / constantFactor) && stockPrice > socialMediaCount / (100 / constantFactor)) ? 1 :
                0;
    }
}
