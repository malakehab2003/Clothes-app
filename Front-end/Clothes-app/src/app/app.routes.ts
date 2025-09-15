import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { CartComponent } from '../Components/cart/cart.component';
import { ProductComponent } from '../Components/product/product.component';
import { CategoryPageComponent } from '../Components/category-page/category-page.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'category', component: CategoryPageComponent },
  { path: 'category/category/:category', component: CategoryPageComponent },
  { path: 'category/brand/:brand', component: CategoryPageComponent },
  { path: 'category/search/:search', component: CategoryPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
