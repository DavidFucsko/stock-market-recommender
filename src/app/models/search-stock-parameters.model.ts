export class SearchStockParamters {
    stockSymbol: string;
    fromDate: string;
    toDate: string;
    facebook: boolean;
    twitter: boolean;
    instagram: boolean;
    additionalParams: any[];
    algorithmToUse: string;

    constructor() {
        this.stockSymbol = '';
        this.fromDate = new Date().toISOString().substring(0, 10);
        this.toDate = new Date().toISOString().substring(0, 10);
        this.facebook = true;
        this.twitter = true;
        this.instagram = true;
        this.additionalParams = [];
        this.algorithmToUse = 'naive';
    }
}
