import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Holdings } from '../holdings';

@Component({
  selector: 'app-portfolio-badge',
  imports: [DecimalPipe],
  templateUrl: './portfolio-badge.html',
  styleUrl: './portfolio-badge.css',
})
export class PortfolioBadge {
  protected readonly totalValue = inject(Holdings).totalValue;
}
