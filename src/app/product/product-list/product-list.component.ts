import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, FlexLayoutModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);
  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => this.products = products)
  }

}
