import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  reviewForm: FormGroup;
  showReviewForm = false;
  filterRating = 0;
  showFilterDropdown = false;
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

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  product = {
    title: 'ONE LIFE GRAPHIC T-SHIRT',
    price: 260,
    oldPrice: 300,
    description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style. ',
    images: [
      '2 (2).png',
      '3 (2).png',
      '4.png'
    ],
    colors: [   '#2d2d2d',  '#334455',  '#556b2f' ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    reviews: [
      { user: 'Samarth', rating: 5, text: 'Excellent t-shirt, fabric quality is top notch.' },
      { user: 'Alex M', rating: 4, text: 'Good value for money. Size fits perfectly.' },
      { user: 'Olivia R', rating: 5, text: 'Absolutely love it. Worth the price.' },
    ]
  };


  reviews = [
    { stars: '★★★★★', rating: 5, text: 'Great quality and fit. Love the color and print.', date: '2025-08-10', name: 'John D.' },
    { stars: '★★★★☆', rating: 4, text: 'Comfortable but runs slightly small.', date: '2025-08-05', name: 'Sarah M.' },
    { stars: '★★★★★', rating: 5, text: 'Exactly as pictured — highly recommended.', date: '2025-07-28', name: 'Mike T.' },
    { stars: '★★★★☆', rating: 4, text: 'Good value for the price.', date: '2025-07-20', name: 'Emma L.' },
    { stars: '★★★★★', rating: 5, text: 'Fast delivery and top-notch fabric.', date: '2025-07-15', name: 'Alex K.' },
    { stars: '★★★☆☆', rating: 3, text: 'Okay quality, expected better.', date: '2025-07-12', name: 'Chris P.' }
  ];

  visibleReviews: any[] = [];
  reviewsToShow = 4;
  filteredReviews: any[] = [];

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredReviews = this.reviews.filter(review => {
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
        stars: '★'.repeat(this.reviewForm.value.rating) + '☆'.repeat(5 - this.reviewForm.value.rating),
        rating: this.reviewForm.value.rating,
        text: this.reviewForm.value.comment,
        date: new Date().toISOString().split('T')[0],
        name: this.reviewForm.value.name
      };
      
      this.reviews.unshift(newReview);
      this.applyFilters();
      this.closeReviewForm();
    }
  }

  recommendations = [
    { img: 'polo.png', title: 'Polo with Contrast Trims', rating: 4.0,  price: 212 },
    { img: 'Gradient Graphic T-shirt.png', title: 'Gradient Graphic T-shirt', rating: 3.5, price: 145 },
    { img: 'Polo with Tipping Details.png', title: 'Polo with Taping Details', rating: 4.5, price: 180 },
    { img: 'Black Striped T-shirt.png', title: 'Black Striped T-shirt', rating: 5.0, price: 120 }
  ];

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