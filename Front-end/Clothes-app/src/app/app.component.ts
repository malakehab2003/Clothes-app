import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component'; // المسار الصحيح

import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Clothes-app';
}
