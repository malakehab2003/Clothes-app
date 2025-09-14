import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any[] = [];
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.products = JSON.parse(localStorage.getItem('cart') || '[]');
    } else {
      this.products = [];
    }
  }

  increase(product: any) {
    product.quantity++;
    localStorage.setItem('cart', JSON.stringify(this.products));
  }
  
  decrease(product: Iproduct) {
    if (product.quantity > 1) {
      product.quantity--;
      localStorage.setItem('cart', JSON.stringify(this.products));
    }
  }
  
  remove(productId: number) {
    this.products = this.products.filter((p: any) => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.products));
  }
  get subtotal(): number {
  return this.products.reduce((acc: any, p: any) => acc + p.price * p.quantity, 0);
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
