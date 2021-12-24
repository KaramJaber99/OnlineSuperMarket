import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Count } from '../models/Count';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public products: Product[];
  public selectedProduct: Product;

  constructor(private http: HttpClient) { 
    this.products = [];
    this.selectedProduct = new Product();
  }

  public getNumberOfAvailableProducts(): Observable<Count> {
    return this.http.get<Count>("http://localhost:3001/products/count");
  }

  public getProducts(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3001/products/" + categoryId);
  }

  public searchProducts(productName: string): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3001/products/search/" + productName);
  }

  public addProduct(): Observable<number> {
    return this.http.post<number>("http://localhost:3001/products/", this.selectedProduct);
  }

  public updateProduct(): Observable<void> {
    return this.http.put<void>("http://localhost:3001/products/", this.selectedProduct);
  }
}
