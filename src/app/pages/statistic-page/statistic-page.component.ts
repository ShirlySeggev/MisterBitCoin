import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { apiObject } from 'src/app/models/apiObject';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit {
  subscription1: Subscription;
  subscription2: Subscription;
  marketPrice: apiObject;
  transactions: apiObject;
  constructor(private bitcoinService: BitcoinService) { }

  ngOnInit(): void {
    this.subscription1 = this.bitcoinService.getMarketPrice().subscribe(marketPrice => this.marketPrice = marketPrice);
    this.subscription2 = this.bitcoinService.getConfirmedTransactions().subscribe(transactions => this.transactions = transactions);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
