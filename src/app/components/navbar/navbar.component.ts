import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'User Form', routerLink: '/user-form' },
      { label: 'Table', routerLink: '/table' },
      { label: 'Bar Chart', routerLink: '/bar-chart' },
    ];
  }
}
