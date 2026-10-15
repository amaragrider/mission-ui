import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Holdings } from '../holdings';

@Component({
  selector: 'app-holdings-summary',
  imports: [DecimalPipe],
  templateUrl: './holdings-summary.html',
  styleUrl: './holdings-summary.css',
})
export class HoldingsSummary {
  private readonly holdingsService = inject(Holdings);
  protected readonly holdings = this.holdingsService.all;
  protected readonly totalValue = this.holdingsService.totalValue;
  protected readonly loadError = this.holdingsService.loadError;

  addHolding() {
    this.holdingsService.add();
  }

  removeHolding(ticker: string) {
    this.holdingsService.remove(ticker);
  }

  loadFromApi(url: string) {
    this.holdingsService.loadFromApi(url);
  }
}
