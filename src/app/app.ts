import { Component, signal } from '@angular/core';
import { CurrencyConverter } from './currency-converter/currency-converter';
import { ConversionHistory } from './conversion-history/conversion-history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CurrencyConverter, ConversionHistory],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('currency-converter-frontend');
}