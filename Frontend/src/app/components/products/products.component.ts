import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public categories: Category[];

  @Output() productClickEvent= new EventEmitter<Product>();

  constructor(private categoriesService: CategoriesService, 
    public productsService: ProductsService) {
      this.categories = [];
    }

  ngOnInit(): void {
    let observable = this.categoriesService.getCategories();

    observable.subscribe(categories => {
      this.categories = categories;

      // Init products with the first category
      this.categoriesService.currentCategoryId = this.categories[0].id;
      this.getProducts(this.categories[0].id);

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  public getProducts(categoryId) {
    this.categoriesService.currentCategoryId = categoryId;
    let observable = this.productsService.getProducts(categoryId);

    observable.subscribe(products => {
      this.productsService.products = products;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  public showProduct(product: Product) {
    this.productClickEvent.emit(product);
  }

}
