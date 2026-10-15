import { Component, signal } from '@angular/core';
import { HoldingsSummary } from './holdings-summary/holdings-summary';
import { PortfolioBadge } from './portfolio-badge/portfolio-badge';
import { PlaceOrder } from './place-order/place-order';

@Component({
  imports: [HoldingsSummary, PortfolioBadge, PlaceOrder],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('mission-ui');
}
