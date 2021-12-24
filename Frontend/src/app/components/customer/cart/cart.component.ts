import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public searchInput: string;

  constructor(public cartService: CartService) { 
    this.searchInput = "";
  }

  ngOnInit(): void {
    if (this.cartService.cart.id === undefined) {
      this.cartService.cart.id = +sessionStorage.getItem("cartId");
    }

    let observable = this.cartService.getCartItems();

    observable.subscribe(cartItems => {
      this.cartService.cart.products = new Map();

      cartItems.map(product => {
        this.cartService.cart.products.set(product.id, product);
        this.cartService.total += (+product.price);
      });
      
      this.cartService.total = +this.cartService.total.toFixed(2); 

    }, serverErrorResponse => {
        alert("Error! Status: " + serverErrorResponse.status + ", Message: " + 
          serverErrorResponse.error.error);
    });
  }

  public onDeleteItemFromCart(product: Product) {
    let observable = this.cartService.deleteItemFromCart(product.id);

    observable.subscribe(response => {
      this.cartService.cart.products.delete(product.id);
      this.cartService.total = +(this.cartService.total - product.price).toFixed(2);

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + 
        serverErrorResponse.error.error);
    });
  }

  public onDeleteAllItems() {
    let observable = this.cartService.emptyCart();

    observable.subscribe(response => {
      this.cartService.cart.products = new Map();
      this.cartService.total = 0;
      
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + 
        serverErrorResponse.error.error);
    });
  }

  public onCheckout() {
    this.cartService.isInShoppingMode = false;
  }

  public onBackToShop() {
    this.cartService.isInShoppingMode = true;
  }

  public onCloseCart() {
    this.cartService.isCartOpen = false;
  }

}
