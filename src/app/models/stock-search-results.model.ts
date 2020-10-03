import { SocialMediaCount } from './social-media-count.model';

export class StockSearchResult {
    stockPrices: number[];
    cumulatedSocialMediaCounts: number[];
    stockRatings: number[];
    dayOfTrades: Date[];
    socialMediaCounts: SocialMediaCount[];
    stockName: string;
    algorithm: string;

    constructor() {
        this.stockPrices = [];
        this.cumulatedSocialMediaCounts = [];
        this.dayOfTrades = [];
        this.socialMediaCounts = [];
        this.stockName = '';
        this.algorithm = '';
    }
}
