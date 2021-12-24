import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  public onProductClick(product: Product) {
    this.productsService.selectedProduct = Object.assign(new Product, product);
  }
}
