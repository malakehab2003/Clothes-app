import { Iproduct } from './../models/iproduct';
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-page',
  imports: [CommonModule, ProductCardComponent, FormsModule],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  categories: string[] = [];
  sizes = ['XS', 'S', 'M', 'L', 'XL'];
  colors = ['Red', 'Orange', 'Green', 'Blue', 'Black', 'Grey', 'Yellow'];
  brands: string[] = [];

  products: any[] = [];

  currentPage = 1;
  pageSize = 9;

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  selectedCategory: string | null = null;
  selectedSize: string | null = null;
  selectedColor: string | null = null;
  selectedbrand: string | null = null;
  maxPrice: number = 200;

  get filteredProducts() {
    return this.products.filter(p =>
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      (!this.selectedSize || p.size === this.selectedSize) &&
      (!this.selectedColor || p.color === this.selectedColor) &&
      (!this.selectedbrand || p.brand === this.selectedbrand) &&
      p.price <= this.maxPrice
    );
  }

  applyCategoryFilter(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  applySizeFilter(size: string) {
    this.selectedSize = size;
    this.currentPage = 1;
  }

  applyColorFilter(color: string) {
    this.selectedColor = color;
    this.currentPage = 1;
  }

  applyBrandFilter(brand: string) {
    this.selectedbrand = brand;
    this.currentPage = 1;
  }

  resetFilters() {
    this.selectedCategory = null;
    this.selectedSize = null;
    this.selectedColor = null;
    this.selectedbrand = null;
    this.maxPrice = 200;
    this.currentPage = 1;
  }

  openFilter: string | null = null;
  toggleFilter(filter: string) {
    this.openFilter = this.openFilter === filter ? null : filter;
  }

  // 🔹 Mobile filter support
  isMobile = false;
  showMobileFilters = false;

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      // get categories from local storage
      const cats: any = JSON.parse(localStorage.getItem("categories") || "[]");
      this.categories = cats || [];

      // get brands from local storage
      const bs: any = JSON.parse(localStorage.getItem("brands") || "[]");
      this.brands = bs || [];
    }
    this.checkMobile();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkMobile();
  }

  private checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters;
  }
}
