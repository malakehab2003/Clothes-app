import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onSearch(value: string) {
    if (value.trim()) {
      this.router.navigate(['/category/search', value]);
    }
  }

  navigateToSection(page: string, section: string) {
    if (this.router.url.startsWith('/' + page)) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate([page], { fragment: section }).then(() => {
        setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      });
    }
  }
}
