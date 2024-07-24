import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private http = inject(HttpClient)
  private apiUrl = environment.api_Url + '/cart';
  private apiCheckoutUrl = environment.api_Url + '/checkout';

  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  getCardItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
  checkOut(checkoutProduct: Product[]): Observable<void> {
    return this.http.post<void>(this.apiCheckoutUrl, checkoutProduct);
  }
}
