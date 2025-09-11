import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component'; // المسار الصحيح

import { RouterOutlet } from '@angular/router';
import { CategoryPageComponent } from './pages/category-page/category-page.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CategoryPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Clothes-app';
}
