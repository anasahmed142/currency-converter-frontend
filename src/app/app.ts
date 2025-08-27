import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyConverter } from './currency-converter/currency-converter';
import { ConversionHistory } from './conversion-history/conversion-history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CurrencyConverter, ConversionHistory],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('currency-converter-frontend');
}
