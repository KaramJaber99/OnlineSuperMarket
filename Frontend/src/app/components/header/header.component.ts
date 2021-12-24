import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { Product } from 'src/app/models/Product';
import { SuccessfulLoginServerResponse } from 'src/app/models/SuccessfulLoginServerResponse';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isCollapsed: boolean;
  public searchTerm: string;

  constructor(private router: Router,
    public cartService: CartService, 
    public usersService: UsersService,
    public productsService: ProductsService,
    public categoriesService: CategoriesService) {
      this.isCollapsed = true;
      this.searchTerm = "";
  }

  ngOnInit(): void {
    this.usersService.loggedInUser = new SuccessfulLoginServerResponse(
      sessionStorage.getItem("token"), sessionStorage.getItem("userType"), 
        sessionStorage.getItem("userName")
    );
  }

  public onCartToggle() {
    this.cartService.isCartOpen = !this.cartService.isCartOpen;
  }

  public onLogout() {
    let observable = this.usersService.logout();

    observable.subscribe(() => {
      // Init system state
    this.usersService.loggedInUser = new SuccessfulLoginServerResponse();
    this.cartService.cart = new Cart();
    this.cartService.cart.products = new Map();
    this.cartService.total = 0;
    this.cartService.isCartOpen = true;
    this.cartService.isInShoppingMode = true;
    this.productsService.selectedProduct = new Product();
    this.productsService.products = [];

    sessionStorage.clear();
    this.router.navigate(["/home"]);
    }, serverErrorResponse => {
      alert(serverErrorResponse.error.error);
    });
  }

  public onSearchProducts() {
    this.categoriesService.currentCategoryId = undefined;
    let observable = this.productsService.searchProducts(this.searchTerm);
    this.searchTerm = "";

    observable.subscribe(products => {
      this.productsService.products = products;
    }, serverErrorResponse => {
      alert(serverErrorResponse.error.error);
    });
  }
}
