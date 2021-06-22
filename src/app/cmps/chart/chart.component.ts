import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { apiObject } from 'src/app/models/apiObject';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() marketPrice: apiObject;

  chartMarketPrice = {
    title: 'Test Chart',
    type: ChartType.AreaChart,
    data: [
      ['Copper', 8.94],
      ['Silver', 10.49],
      ['Gold', 19.3],
      ['Platinum', 21.45]
    ],
    columnNames: ['Element', 'Density'],
    options: {
      colors: ['#cfaa01'],
    }
  };


  @Input() transactions: apiObject;

  chartTransactions = {
    title: 'Test Chart',
    type: ChartType.AreaChart,
    data: [
      ['Copper', 8.94],
      ['Silver', 10.49],
      ['Gold', 19.3],
      ['Platinum', 21.45]
    ],
    columnNames: ['Element', 'Density'],
    options: {
      colors: ['#cfaa01'],
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.chartMarketPrice.title = this.marketPrice.name;
    const dataMarket = this.marketPrice.values.map((value: any) => {
      return [new Date(value.x * 1000).getDate(), value.y]
    })
    dataMarket.sort(function (a, b) { return a[0] - b[0] });
    this.chartMarketPrice.data = dataMarket;


    this.chartTransactions.title = this.transactions.name;
    const dataTransactions = this.transactions.values.map((value: any) => {
      return [new Date(value.x * 1000).getDate(), value.y]
    })
    dataTransactions.sort(function (a, b) { return a[0] - b[0] });
    this.chartTransactions.data = dataTransactions;


  }

}
