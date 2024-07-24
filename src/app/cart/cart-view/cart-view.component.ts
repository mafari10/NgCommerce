import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, MatListModule, MatButtonModule],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss'
})
export class CartViewComponent implements OnInit {
  private cartService = inject(CartService)
  cartProducts: Product[] = [];
  totalPrice: number = 0;
  ngOnInit(): void {
    this.cartService.getCardItems().subscribe(data => {
      this.cartProducts = data;
      this.totalPrice = this.getTotalPrice();

    })
  }

  getTotalPrice(): number {
    let total = 0;
    for (let item of this.cartProducts) {
      total += item.price;
    }
    return total;
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.cartProducts = [];
      this.totalPrice = 0;
      alert("carts has been cleared");
    });
  }
  checkOut(product: Product[]): void {
    this.cartService.checkOut(product).subscribe((data) => {
      console.log(data);
    })
  }
}
