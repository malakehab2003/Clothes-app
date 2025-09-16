import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  products: any[] = [];
  categories: any[] = [];
  brands: any[] = [];
  constructor(private http: HttpClient) {}

  getRandomColors = (arr: string[], n: number): string[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  getRandomSize = (arr: string[], n: number): string[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  fetchData = () => {
    const apiUrls = [
      'https://dummyjson.com/products/category/mens-shirts',
      'https://dummyjson.com/products/category/mens-shoes',
      'https://dummyjson.com/products/category/womens-dresses',
      'https://dummyjson.com/products/category/womens-shoes',
    ];

    const requests = apiUrls.map(url => this.http.get(url));
    forkJoin(requests).subscribe({
      next: (data: any) => {
        // get products
        this.products = data.reduce((all: any[], res: any) => {
          return all.concat(res.products || []);
        }, []);


        // add colors to products
        const colors = ['Red', 'Orange', 'Green', 'Blue', 'Black', 'Grey', 'Yellow'];

        this.products.map((p) => {
          p.colors = this.getRandomColors(colors, 3);
        });



        // add sizes to products
        const clothesSize = ['XS', 'S', 'M', 'L', 'XL'];
        const menShoeSize = ['40', '41', '42', '43', '44'];
        const womenShoeSize = ['37', '38', '39', '40', '41'];

        this.products.map((p) => {
          if (p.category === "mens-shirts" || p.category === 'womens-dresses') {
            p.sizes = this.getRandomSize(clothesSize, 3);
          } else if (p.category === "mens-shoes") {
            p.sizes = this.getRandomSize(menShoeSize, 3);
          } else if (p.category === "womens-shoes") {
            p.sizes = this.getRandomSize(womenShoeSize, 3);
          }
        });

        // get categories and brands unique
        this.categories = Array.from(new Set(this.products.map(p => p.category)));
        
        this.brands = Array.from(
          new Set(
            this.products
              .map(p => p.brand)
              .filter(b => b)
          )
        );

        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("products", JSON.stringify(this.products))
        }
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("categories", JSON.stringify(this.categories))
        }
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("brands", JSON.stringify(this.brands))
        }

      },


      error: (err) => {
        console.error('Error: ', err)
      }

    })
  }

  getData = () => {
    let storedProducts;
    let storedCategories;
    let storedBrands;
    if (typeof window !== 'undefined' && localStorage) {
      storedProducts = localStorage.getItem('products');
      this.products = JSON.parse(storedProducts || '[]');

      storedCategories = localStorage.getItem('categories');
      this.categories = JSON.parse(storedCategories || '[]');
      
      storedBrands = localStorage.getItem('brands');
      this.brands = JSON.parse(storedBrands || '[]');
    }

    if (!this.products || this.products.length < 1) {
      this.fetchData()
    }

  }
}
