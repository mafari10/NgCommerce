import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, FlexLayoutModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);
  private CartService = inject(CartService);
  private snackbar = inject(MatSnackBar);
  // Search using ngModel
  private searchTerm: string = '';
  // Filtered result
  filteredProduct: Product[] = [];
  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products
      this.filteredProduct = products
    })
  }
  addToCart(product: Product): void {
    this.CartService.addToCart(product).subscribe({
      next: () => {
        this.snackbar.open('Product added to cart !', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
      }
    })
  }
  // Property to access and set the private modifier
  get productName(): string {
    return this.searchTerm;
  }
  set productName(value: string) {
    this.searchTerm = value.toLowerCase();
  }
  applyFilter() {
    this.filteredProduct = this.products.filter((product) => product.name.toLowerCase().includes(this.productName))
  }
}
