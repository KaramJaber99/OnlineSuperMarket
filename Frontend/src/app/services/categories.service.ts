import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public currentCategoryId: number;
  
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:3001/categories/");
  }
}
