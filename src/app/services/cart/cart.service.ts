import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseURL = "http://localhost:3000/cart/";
  
  constructor(private http: HttpClient, private router: Router) { }

  public getCart(): Observable<any> {
    return this.http.get(this.baseURL + "get-cart");
  }

  public addToCart(items: any): Observable<any> {
    return this.http.post(this.baseURL + "add-to-cart", { items: items });
  }

  public deleteItem(items: any): Observable<any> {
    return this.http.post(this.baseURL + "delete-item", { items: items });
  }

  public clearCart(): Observable<any> {
    return this.http.get(this.baseURL + "clear-cart");
  }
}


