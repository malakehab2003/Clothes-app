import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private apiUrls = [
    'https://dummyjson.com/products/category/mens-shirts',
    'https://dummyjson.com/products/category/mens-shoes',
    'https://dummyjson.com/products/category/womens-dresses',
    'https://dummyjson.com/products/category/womens-shoes',
  ];
  products: any[] = [];
  categories: any[] = [];
  dressStyles: any[] = [];
  brands: any[] = [];
  newArrivals: any[] = [];
  topSelling: any[] = [];
  onSale: any[] = [];
  constructor(private http: HttpClient) {}

  getRandomColors = (arr: string[], n: number): string[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  getRandomSize = (arr: string[], n: number): string[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  ngOnInit(): void{
    const requests = this.apiUrls.map(url => this.http.get(url));
    forkJoin(requests).subscribe({
      next: (data: any) => {
        // get products
        this.products = data.reduce((all: any[], res: any) => {
        return all.concat(res.products || []);
      }, []);

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

        // add colors to products
        const colors = ['Red', 'Orange', 'Green', 'Blue', 'Black', 'Grey', 'Yellow'];

        // Load saved colors from localStorage
        let savedColors: Record<string, string[]> = {};
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            savedColors = JSON.parse(localStorage.getItem('colors') || '{}');
          } catch {
            savedColors = {};
          }
        }

        // Assign colors to products
        const updatedProducts = this.products.map(p => {
          if (!p.id) return p;

          if (!savedColors[p.id]) {
            savedColors[p.id] = this.getRandomColors(colors, 3);
          }

          p.colors = savedColors[p.id];
          return p;
        });

        // Save updated colors in localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('colors', JSON.stringify(savedColors));
        }

        // add size to products
        const size = ['XS', 'S', 'M', 'L', 'XL'];

        // Load saved sizes from localStorage
        let savedSizes: Record<string, string[]> = {};
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            savedSizes = JSON.parse(localStorage.getItem('sizes') || '{}');
          } catch {
            savedSizes = {};
          }
        }

        // Assign size to products
        const updatedProductsSize = this.products.map(p => {
          if (!p.id) return p;

          if (!savedSizes[p.id]) {
            savedSizes[p.id] = this.getRandomColors(size, 3);
          }

          p.sizes = savedSizes[p.id];
          return p;
        });

        // Save updated colors in localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('sizes', JSON.stringify(savedSizes));
        }

        // get categories and brands unique and save it in localstorage
        this.categories = Array.from(new Set(this.products.map(p => p.category)));
        
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("categories", JSON.stringify(this.categories));
        }

        this.dressStyles = [
          { name: this.categories[0], image: 'assets/images/10.png' },
          { name: this.categories[1], image: 'assets/images/11.png' },
          { name: this.categories[2], image: 'assets/images/12.png' },
          { name: this.categories[3], image: 'assets/images/13.png' }
        ];
        
        this.brands = Array.from(new Set(this.products.map(p => p.brand)));
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("brands", JSON.stringify(this.brands));
        }

      },
      error: (err) => {
        console.error('Error: ', err)
      }

    })
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
