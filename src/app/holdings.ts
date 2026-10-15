import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

interface Holding {
  ticker: string;
  quantity: number;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class Holdings {
  private readonly http = inject(HttpClient);
  private readonly holdings = signal<Holding[]>([
    { ticker: 'ULVR.L', quantity: 500, price: 42.1 },
    { ticker: 'AZN.L', quantity: 120, price: 108.5 },
  ]);

  readonly all = this.holdings.asReadonly();
  readonly loadError = signal<string | null>(null);

  readonly totalValue = computed(() =>
    this.holdings().reduce((sum, holding) =>
      sum + holding.quantity * holding.price, 0),
  );

  add() {
    this.holdings.update((holdings) => [
      ...holdings,
      { ticker: 'BP.L', quantity: 200, price: 4.8 },
    ]);
  }

  remove(ticker: string) {
    this.holdings.update((holdings) =>
      holdings.filter((holding) => holding.ticker !== ticker));
  }

  loadFromApi(url: string): void {
    this.http.get<Holding[]>(url).pipe(
      catchError((error: unknown) => {
        let message = 'Unknown error';
        if (error instanceof HttpErrorResponse || error instanceof Error) {
          message = error.message;
        } else {
          message = JSON.stringify(error) ?? message;
        }
        this.loadError.set(message);
        return of(null);
      }),
    ).subscribe((data: Holding[] | null) => {
      if (data !== null) {
        this.loadError.set(null);
        this.holdings.set(data);
      }
    });
  }
}
