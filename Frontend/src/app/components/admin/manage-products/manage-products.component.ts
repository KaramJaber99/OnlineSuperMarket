import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  public categories: Category[];
  public isFormOpened: boolean;

  constructor(private categoriesService: CategoriesService,
    public productsService: ProductsService) {
      this.isFormOpened = false;
  }

  ngOnInit(): void {
    let observable = this.categoriesService.getCategories();

    observable.subscribe(categories => {
      this.categories = categories;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " +
        serverErrorResponse.error.error);
    });
  }

  public onSaveProduct() {
    if(this.productsService.selectedProduct.id) {
      this.updateProduct(this.productsService.selectedProduct);
    }
    else {
      this.addProduct(this.productsService.selectedProduct,);
    }
  }

  private updateProduct(product: Product) {
    let observable = this.productsService.updateProduct();
    observable.subscribe(() => {
      // Update UI
      this.productsService.products.forEach((currentProduct, index) => {
        if(currentProduct.id === product.id) {
          
          // If category wasn't changed replace the product. 
          // If it was, remove it.
          if(currentProduct.categoryId === product.categoryId) {
            this.productsService.products.splice(index, 1, product);
          }
          else {
            this.productsService.products.splice(index, 1);
          }
          return;
        }
      });

      alert("Saved Successfuly");
      this.init();

    }, serverErrorResponse => {
      alert(serverErrorResponse.error.error);
    });
  }

  private addProduct(product: Product) {
    let observable = this.productsService.addProduct();
    observable.subscribe(newProductId => {
      // Update UI
      if(product.categoryId === this.categoriesService.currentCategoryId) {
        product.id = newProductId;
        this.productsService.products.push(product);
      }

      alert("Saved Successfuly");
      this.init();

    }, serverErrorResponse => {
      alert(serverErrorResponse.error.error);
      console.error("Error! Status: " + serverErrorResponse.status + ", Message: " +
        serverErrorResponse.error.error);
    });
  }

  private init() {
    this.productsService.selectedProduct = new Product();
    this.isFormOpened = false;
  }

  public onAddNewProduct() {
    this.productsService.selectedProduct = new Product();
    this.isFormOpened = true;
  }
}
