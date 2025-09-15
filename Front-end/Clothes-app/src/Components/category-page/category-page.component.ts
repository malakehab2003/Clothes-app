import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { GetDataService } from '../../Services/get-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


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
  category: string | null = '';
  brand: string | null = '';
  search: string | null = '';

  products: any[] = [];

  currentPage = 1;
  pageSize = 9;
  constructor(private data: GetDataService,  public activedrouter : ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activedrouter.paramMap.subscribe(params => {
      this.category = params.get('category') || null;
      this.brand = params.get('brand') || null;
      this.search = params.get('search') || null;

      if (this.category) {
        this.selectedCategory = this.category;
      } else if (this.brand) {
        this.selectedbrand = this.brand;
      }
    });
    this.data.getData()
    this.categories = this.data.categories;
    this.brands = this.data.brands
    this.products = this.data.products;
    if (typeof window !== 'undefined') {
      this.checkMobile();
    }
  }

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
      (!this.selectedSize || p.sizes.includes(this.selectedSize)) &&
      (!this.selectedColor || p.colors.includes(this.selectedColor)) &&
      (!this.selectedbrand || p.brand === this.selectedbrand) &&
      (!this.search || 
        p.title.toLowerCase().includes(this.search.toLowerCase()) ||
        p.description.toLowerCase().includes(this.search.toLowerCase())
      )&&
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
    if (this.search) {
      this.router.navigate(['/category']);
    }
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
