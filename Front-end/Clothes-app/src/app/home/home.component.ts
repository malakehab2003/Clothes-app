import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  newArrivals = [
    { name: 'T-shirt with Tape Details', price: 120, image: 'assets/images/2.png', rating: 4.5 },
    { name: 'Gingko Fit Jeans', price: 240, image: 'assets/images/3.png', rating: 3 },
    { name: 'Checkered Shirt', price: 180, image: 'assets/images/4.png', rating: 5 },
    { name: 'Sleeve Striped T-shirt', price: 130, image: 'assets/images/5.png', rating: 4 },
    { name: 'Gradient Graphic T-shirt', price: 300, image: 'assets/images/17.png', rating: 4.2 },
    { name: 'One Life Graphic T-shirt', price: 210, image: 'assets/images/18.png', rating: 3.8 }
  ];

  topSelling = [
    { name: 'Vertical Striped Shirt', price: 212, image: 'assets/images/6.png', rating: 3.5 },
    { name: 'Orange Graphic T-shirt', price: 145, image: 'assets/images/7.png', rating: 4 },
    { name: 'Loose Fit Bermuda Shorts', price: 80, image: 'assets/images/8.png', rating: 5 },
    { name: 'Faded Skinny Jeans', price: 210, image: 'assets/images/9.png', rating: 4.5 },
    { name: 'Black Striped T-shirt', price: 500, image: 'assets/images/15.png', rating: 5 },
    { name: 'Polo with Tipping Details', price: 350, image: 'assets/images/16.png', rating: 4.7 }
  ];

  dressStyles = [
    { name: 'Casual', image: 'assets/images/10.png' },
    { name: 'Formal', image: 'assets/images/11.png' },
    { name: 'Party', image: 'assets/images/12.png' },
    { name: 'Gym', image: 'assets/images/13.png' }
  ];

  showAllArrivals = false;
  showAllTopSelling = false;

  get visibleArrivals() {
    return this.showAllArrivals ? this.newArrivals : this.newArrivals.slice(0, 4);
  }

  get visibleTopSelling() {
    return this.showAllTopSelling ? this.topSelling : this.topSelling.slice(0, 4);
  }

  toggleShowAllArrivals() {
    this.showAllArrivals = !this.showAllArrivals;
  }

  toggleShowAllTopSelling() {
    this.showAllTopSelling = !this.showAllTopSelling;
  }
}
