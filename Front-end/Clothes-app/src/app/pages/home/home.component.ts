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
  ];

  topSelling = [
    { name: 'Vertical Striped Shirt', price: 212, image: 'assets/images/6.png', rating: 3.5 },
    { name: 'Orange Graphic T-shirt', price: 145, image: 'assets/images/7.png', rating: 4 },
    { name: 'Loose Fit Bermuda Shorts', price: 80, image: 'assets/images/8.png', rating: 5 },
    { name: 'Faded Skinny Jeans', price: 210, image: 'assets/images/9.png', rating: 4.5 },
  ];

  dressStyles = [
    { name: 'Casual', image: 'assets/images/10.png' },
    { name: 'Formal', image: 'assets/images/11.png' },
    { name: 'Party', image: 'assets/images/12.png' },
    { name: 'Gym', image: 'assets/images/13.png' }
  ];
}
