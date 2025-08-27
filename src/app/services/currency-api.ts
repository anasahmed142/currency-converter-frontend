import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CurrencyApi {
  private backendUrl = 'https://currency-converter-backend-cc3y.onrender.com/currency';
  private userIdKey = 'currency_converter_user_id';
  historyUpdated$ = new Subject<void>();
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  getOrCreateUserId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      let userId = localStorage.getItem(this.userIdKey);
      if (!userId) {
        userId = uuidv4();
        localStorage.setItem(this.userIdKey, userId);
      }
      return userId;
    }
    return null;
  }

  getSupportedCurrencies(): Observable<any> {
    return this.http.get(`${this.backendUrl}/list`).pipe(
      tap((response) => {
      }),
    );
  }

  convertCurrency(data: {
    from: string;
    to: string;
    amount: number;
    userId: string;
  }): Observable<any> {
    return this.http.post(`${this.backendUrl}/convert`, data).pipe(
      tap((response) => {
        this.historyUpdated$.next();
      }),
    );
  }

  getConversionHistory(userId: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/history?userId=${userId}`).pipe(
      tap((response) => {
      }),
    );
  }
}