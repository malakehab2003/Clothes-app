import { Component } from '@angular/core';
import { Product } from '../models/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: Product[] = [
    { id: 1, name: 'Gradient Graphic T-shirt', size: 'Large', color: 'White', price: 145, image: 'T-shirt1cart.png', quantity: 1 },
    { id: 2, name: 'Checkered Shirt', size: 'Medium', color: 'Red', price: 180, image: 'T-shirt2cart.png', quantity: 1 },
    { id: 3, name: 'Skinny Jeans', size: 'Large', color: 'Blue', price: 240, image: 'skinnycart.png', quantity: 1 }
  ];

  increase(product: Product) {
    product.quantity++;
  }

  decrease(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  remove(productId: number) {
    this.products = this.products.filter(p => p.id !== productId);
  }
  get subtotal(): number {
  return this.products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }
  get discount(): number {
  return this.subtotal * 0.2;
  }
  get deliveryFee(): number {
    return 15;
  }

  get total(): number {
    return this.subtotal - this.discount + this.deliveryFee;
  }
}
