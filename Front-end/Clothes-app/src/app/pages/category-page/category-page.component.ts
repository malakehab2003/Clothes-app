import { Iproduct } from './../../models/iproduct';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-page',
  imports: [CommonModule, ProductCardComponent, FormsModule],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent {
 categories = ['T-shirts', 'Shirts', 'Jeans', 'Hoodies'];
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  colors = ['#000', '#fff', '#ff0000', '#00ff00', '#0000ff', '#ffa500', '#800080'];
  styles = ['Casual', 'Formal', 'Party', 'Gym'];

  products: Iproduct[] = Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      name: `Product ${id}`,
      image: `/assets/product${(id % 10) + 1}.png`,
      price: 50 + (id % 20) * 5,
      oldPrice: 60 + (id % 20) * 5,
      discount: (id % 5) * 5,
      rating: 3 + (id % 3) * 0.5,
      reviews: 20 + (id * 7) % 200,
      category: this.categories[id % this.categories.length],
      size: this.sizes[id % this.sizes.length],
      color: this.colors[id % this.colors.length],
      style: this.styles[id % this.styles.length],
    };
  });

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
  selectedStyle: string | null = null;
  maxPrice: number = 200;

  get filteredProducts() {
    return this.products.filter(p =>
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      (!this.selectedSize || p.size === this.selectedSize) &&
      (!this.selectedColor || p.color === this.selectedColor) &&
      (!this.selectedStyle || p.style === this.selectedStyle) &&
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

  applyStyleFilter(style: string) {
    this.selectedStyle = style;
    this.currentPage = 1;
  }

  resetFilters() {
    this.selectedCategory = null;
    this.selectedSize = null;
    this.selectedColor = null;
    this.selectedStyle = null;
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
