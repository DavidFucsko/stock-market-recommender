export class StockPriceModel {
    stockSymbol: string;
    price: number;
    dayOfTrade: Date;

    constructor() {
        this.stockSymbol = '';
        this.price = 0;
        this.dayOfTrade = new Date();
    }
}
