import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/IReview';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  ID: number = 0;
  product: any;
  recommendations: any[] = [];
  reviewForm: FormGroup;
  showReviewForm = false;
  filterRating = 0;
  showFilterDropdown = false;
  reviews: Review[] = [];
  ratingFilters = [
    { value: 0, label: 'All Ratings' },
    { value: 5, label: '5 Stars Only', icon: '★★★★★' },
    { value: 4, label: '4+ Stars', icon: '★★★★☆' },
    { value: 3, label: '3+ Stars', icon: '★★★☆☆' },
    { value: 2, label: '2+ Stars', icon: '★★☆☆☆' },
    { value: 1, label: '1+ Star', icon: '★☆☆☆☆' }
  ];

  sortByLatest = true;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {

    const target = event.target as HTMLElement;
    if (!target.closest('.filter-container')) {
      this.showFilterDropdown = false;
    }
  }

  constructor(private fb: FormBuilder, private activedrouter : ActivatedRoute, private http: HttpClient) {
    this.reviewForm = this.fb.group({
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }



visibleReviews: Review[] = [];
  reviewsToShow = 4;
  filteredReviews: Review[] = [];

  ngOnInit() {
    // get id from params
    this.ID = Number(this.activedrouter.snapshot.paramMap.get('id'));

    // get product from api
    if (this.ID) {
      const url = `https://dummyjson.com/products/${this.ID}`
      this.http.get(url).subscribe({
        next: (data) => {
          this.product = data;
          this.product.colors = ["Red", "Orange", "Green", "Blue", "Yellow"];
          this.product.sizes = ["XS", "S", "M", "L", "XL"];

          this.reviews = this.product.reviews || [];
          this.applyFilters();

          this.getRelatedProducts(this.product.category, this.product.id);
        },

        error: (err) => {
          console.error('Error fetching product', err);
        }
      })
    }


    this.applyFilters();
  }


  getRelatedProducts(category: string, excludeId: number) {
    const url = `https://dummyjson.com/products/category/${category}`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        // exclude current product
        this.recommendations = data.products.filter((p: any) => p.id !== excludeId).slice(0, 6);
      },
      error: (err) => {
        console.error('Error fetching related products', err)
      }
    });
  }


  get dimensionsArray() {
  return this.product?.dimensions 
    ? Object.entries(this.product.dimensions).map(([key, value]) => ({ key, value })) 
    : [];
}

  applyFilters() {
    if (!this.reviews) {
      this.filteredReviews = [];
      return;
    }

    this.filteredReviews = this.reviews.filter((review: any) => {
      if (this.filterRating === 0) return true; 
      return review.rating >= this.filterRating;
    });

    this.sortReviews();
    this.visibleReviews = this.filteredReviews.slice(0, this.reviewsToShow);
  }

  sortReviews() {
    this.filteredReviews.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.sortByLatest ? dateB - dateA : dateA - dateB;
    });
  }

  loadMoreReviews() {
    const next = this.visibleReviews.length + this.reviewsToShow;
    this.visibleReviews = this.filteredReviews.slice(0, next);
  }

  toggleSortOrder() {
    this.sortByLatest = !this.sortByLatest;
    this.applyFilters();
  }

  setFilterRating(rating: number) {
    this.filterRating = rating;
    this.showFilterDropdown = false;
    this.reviewsToShow = 4; 
    this.applyFilters();
  }

  toggleFilterDropdown(event: Event) {
    event.stopPropagation();
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  get activeFilterLabel(): string {
    const filter = this.ratingFilters.find(f => f.value === this.filterRating);
    return filter ? filter.label : 'Filter';
  }

  openReviewForm() {
    this.showReviewForm = true;
  }

  closeReviewForm() {
    this.showReviewForm = false;
    this.reviewForm.reset({ rating: 5 });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      const newReview = {
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        date: new Date().toISOString(),
        reviewerName: this.reviewForm.value.reviewerName,
        reviewerEmail: this.reviewForm.value.reviewerEmail,
      };

      this.reviews.unshift(newReview);
      this.applyFilters();
      this.closeReviewForm();
    }
  }

  selectedImageIndex = 0;
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  quantity = 1;
  activeTab = 'details';

  changeImage(index: number) {
    this.selectedImageIndex = index;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    if (!this.selectedSize) {
      alert('Please select a size!');
      return;
    }
    
    if (!this.selectedColor) {
      alert('Please select a Color!');
      return;
    }

    alert(`Added ${this.quantity} x ${this.product.title} (Size: ${this.selectedSize}, Color: ${this.selectedColor}) to cart`);
  }
    getStars(rating: number): string[] {
  const fullStars = Math.floor(rating);      
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;  
  const emptyStars = 5 - fullStars - halfStar;   

  return [
    ...Array(fullStars).fill('full'),
    ...Array(halfStar).fill('half'),
    ...Array(emptyStars).fill('empty')
  ];
}


}