import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { apiObject } from '../models/apiObject';



@Injectable({
    providedIn: 'root'
})
export class BitcoinService {

    constructor(private http: HttpClient) { }

    public getRate(/* coins: number */) {
        return this.http.get<number>('https://blockchain.info/tobtc?currency=USD&value=1')
    }

    public getMarketPrice() {
        return this.http.get<apiObject>(`https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true`)
    }

    public getConfirmedTransactions() {
        return this.http.get<apiObject>(`https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true`)
    }



}
