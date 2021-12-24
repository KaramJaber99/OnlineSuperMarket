import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: Cart;
  public total: number;
  public isCartOpen: boolean;
  public isInShoppingMode: boolean;

  constructor(private http: HttpClient) { 
    this.cart = new Cart();
    this.cart.products = new Map();
    this.total = 0;
    this.isCartOpen = true;
    this.isInShoppingMode = true;
  }

  public getOpenCart(): Observable<Cart> {
    return this.http.get<Cart>("http://localhost:3001/carts/");
  }

  public createNewCart(): Observable<number> {
    return this.http.post<number>("http://localhost:3001/carts/", null);
  }

  public getCartItems(): Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:3001/carts/" + this.cart.id);
  }

  public addItemToCart(product: Product): Observable<void> {
    return this.http.post<void>("http://localhost:3001/carts/product",{cartId: this.cart.id, product});
  }

  public deleteItemFromCart(productId: number): Observable<void> {
    return this.http.delete<void>("http://localhost:3001/carts/product/" + this.cart.id + "/" + productId);
  }

  public emptyCart(): Observable<void> {
    return this.http.delete<void>("http://localhost:3001/carts/" + this.cart.id);
  }

  public updateCartItem(product: Product): Observable<void> {
    return this.http.put<void>("http://localhost:3001/carts/", {product, cartId: this.cart.id});
  }
}
