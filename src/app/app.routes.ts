import { Routes } from '@angular/router';
import { CurrencyConverter} from './currency-converter/currency-converter';
import { ConversionHistory } from './conversion-history/conversion-history';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: CurrencyConverter },
  { path: 'history', component: ConversionHistory },
];