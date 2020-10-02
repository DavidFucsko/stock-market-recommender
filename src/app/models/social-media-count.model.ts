import { CountByType } from './count-by-type.model';

export class SocialMediaCount {
    stockSymbol: string;
    socialMediaCounts: CountByType[];
    dayOfTrade: Date;

    constructor() {
        this.stockSymbol = '';
        this.socialMediaCounts = [new CountByType()];
        this.dayOfTrade = new Date();
    }
}
