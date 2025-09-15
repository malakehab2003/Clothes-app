import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GetDataService } from '../../Services/get-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  brands: any[] = [];
  newArrivals: any[] = [];
  topSelling: any[] = [];
  onSale: any[] = [];
  constructor(private data: GetDataService) {}

  ngOnInit(): void{
    this.data.getData();
    this.products = this.data.products
    this.brands = this.data.brands
    this.categories = [
      { name: this.data.categories[0], image: 'assets/images/10.png' },
      { name: this.data.categories[1], image: 'assets/images/11.png' },
      { name: this.data.categories[2], image: 'assets/images/12.png' },
      { name: this.data.categories[3], image: 'assets/images/13.png' }
    ];
    // get new arrivals
    this.newArrivals = [...this.products].sort(
      (a, b) => new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime()
    ).slice(0, 10);

    // get top selling with highest rating
    this.topSelling = [...this.products].sort(
      (a, b) => b.rating - a.rating
    ).slice(0, 10);

    // get on sale products
    this.onSale = [...this.products].filter(
      (a) => a.discountPercentage > 0
    ).slice(0, 10);
  }

  showAllArrivals = false;
  showAllTopSelling = false;
  showAllSale = false;

  get visibleArrivals() {
    return this.showAllArrivals ? this.newArrivals : this.newArrivals.slice(0, 4);
  }

  get visibleTopSelling() {
    return this.showAllTopSelling ? this.topSelling : this.topSelling.slice(0, 4);
  }

  get visibleSale() {
    return this.showAllSale ? this.onSale : this.onSale.slice(0, 4);
  }

  toggleShowAllArrivals() {
    this.showAllArrivals = !this.showAllArrivals;
  }

  toggleShowAllTopSelling() {
    this.showAllTopSelling = !this.showAllTopSelling;
  }

  toggleSale() {
    this.showAllSale = !this.showAllSale;
  }
}
