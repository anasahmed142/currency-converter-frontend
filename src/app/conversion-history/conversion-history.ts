import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyApi } from '../services/currency-api';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-conversion-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './conversion-history.html',
  styleUrl: './conversion-history.scss'
})
export class ConversionHistory implements OnInit {
  displayedColumns: string[] = ['timestamp', 'fromCurrency', 'toCurrency', 'amount', 'convertedAmount'];
  dataSource: any[] = [];
  isLoading = false;

  constructor(private currencyApiService: CurrencyApi) { }

  ngOnInit(): void {
    this.getHistory();
    this.currencyApiService.historyUpdated$.subscribe(() => {
      this.getHistory();
    });
  }

  getHistory(): void {
    this.isLoading = true;
    const userId = this.currencyApiService.getOrCreateUserId();

    if (userId) {
      this.currencyApiService.getConversionHistory(userId).subscribe({
        next: (history) => {
          this.dataSource = history;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to fetch history', err);
          this.isLoading = false;
        }
      });
    } else {
      console.error('User ID not available, skipping history fetch.');
      this.isLoading = false;
    }
  }
}