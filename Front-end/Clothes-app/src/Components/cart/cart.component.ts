import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { CurrencyPipe } from '@angular/common';
import { GetDataService } from '../../Services/get-data.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NgIf],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any[] = [];
  promos: Record<string, number> = {};
  validPromo: boolean = false;
  promo: number = 0;
  constructor(private data: GetDataService, private router: Router) {};
  ngOnInit(): void {
    this.data.getData();
    this.promos = this.data.promos;
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

  validatePromo(promo: string) {
    if (promo && promo.length > 0 && Object.keys(this.promos).includes(promo)) {
      this.validPromo = true;
      this.promo = this.promos[promo];
    } else {
      alert("this promo code is not valid");
      this.promo = 0;
      this.validPromo = false;

    }
  }

  get applypromo(): number{
    if (this.validPromo) {
      return this.subtotal * this.promo / 100;
    }
    return 0
  }

  get discount(): number {
    return this.subtotal * 0.2;
  }
  get deliveryFee(): number {
    return 15;
  }

  get total(): number {
    return this.subtotal - this.discount - this.applypromo + this.deliveryFee;
  }

  Checkout () {
    if (!this.products || this.products.length <= 0) {
      alert("Can't check out");
      return;
    }

    if (typeof window !== 'undefined' && localStorage) {
      const totalPrice = this.total.toFixed(2)

      const checkoutData = {
        products: this.products,
        purchaseData: {
          totalPrice: totalPrice,
          createdAt: new Date().toISOString()
        }
      };

      const existingOrders = JSON.parse(localStorage.getItem('checkout') || '[]');
      existingOrders.push(checkoutData);
      localStorage.setItem('checkout', JSON.stringify(existingOrders));

      this.products = [];
      localStorage.removeItem('cart');
      alert("Purchased successfully");
      this.router.navigate(['/home']);
    }
  }
}
