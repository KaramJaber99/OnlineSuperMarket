import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public numberOfProducts: number;
  public numberOfOrders: number;

  constructor(private productsService: ProductsService, 
    private ordersServices: OrdersService) { }

  ngOnInit(): void {
    let observable = this.productsService.getNumberOfAvailableProducts();

    observable.subscribe(result => {
      this.numberOfProducts = result.count;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });

    observable = this.ordersServices.getNumberOfAllOrders();

    observable.subscribe(result => {
      this.numberOfOrders = result.count;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

}
