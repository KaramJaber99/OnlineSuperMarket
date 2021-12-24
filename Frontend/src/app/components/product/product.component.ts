import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product:Product;
  
  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
  }

}
