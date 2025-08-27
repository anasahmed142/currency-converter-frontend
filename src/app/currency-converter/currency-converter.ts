import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyApi } from '../services/currency-api';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './currency-converter.html',
  styleUrl: './currency-converter.scss'
})
export class CurrencyConverter implements OnInit {
  converterForm: FormGroup;
  currencies: string[] = [];
  convertedAmount: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private currencyApiService: CurrencyApi
  ) {
    this.converterForm = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.getSupportedCurrencies();
  }

  getSupportedCurrencies(): void {
    this.currencyApiService.getSupportedCurrencies().subscribe({
      next: (data) => {
        this.currencies = Object.keys(data);
      },
      error: (err) => {
        console.error('Failed to fetch currencies', err);
      }
    });
  }

  convert(): void {
    if (this.converterForm.valid) {
      this.isLoading = true;
      const { fromCurrency, toCurrency, amount } = this.converterForm.value;
      if (fromCurrency === toCurrency) {
        this.convertedAmount = amount;
        return;
      }
      const userId = this.currencyApiService.getOrCreateUserId();

      if (userId) {
        this.currencyApiService.convertCurrency({
          from: fromCurrency,
          to: toCurrency,
          amount: amount,
          userId: userId,
        }).subscribe({
          next: (response) => {
            this.convertedAmount = response.convertedAmount;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Conversion failed', err);
            this.isLoading = false;
          }
        });
      } else {
        console.error('User ID not available, skipping conversion.');
        this.isLoading = false;
      }
    }
  }
}