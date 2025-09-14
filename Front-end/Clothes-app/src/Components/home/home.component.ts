import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private apiUrl = 'https://dummyjson.com/products';
  products: any[] = [];
  categories: any[] = [];
  brands: any[] = [];
  newArrivals: any[] = [];
  topSelling: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void{
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => {
        // get products
        this.products = data.products;

        // get new arrivals
        this.newArrivals = [...this.products].sort(
          (a, b) => new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime()
        ).slice(0, 10);

        // get top selling with highest rating
        this.topSelling = [...this.products].sort(
          (a, b) => b.rating - a.rating
        ).slice(0, 10);

        // get categories and brands unique and save it in localstorage
        this.categories = Array.from(new Set(this.products.map(p => p.category)));
        this.brands = Array.from(new Set(this.products.map(p => p.brand)));

        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("categories", JSON.stringify(this.categories));
        }
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("brands", JSON.stringify(this.brands));
        }

      },
      error: (err) => {
        console.error('Error: ', err)
      }

    })
  }

  dressStyles = [
    { name: 'Beauty', image: 'assets/images/10.png' },
    { name: 'Fragrances', image: 'assets/images/11.png' },
    { name: 'Furniture', image: 'assets/images/12.png' },
    { name: 'Groceries', image: 'assets/images/13.png' }
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
