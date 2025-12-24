import { Component, Host, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
[x: string]: any;
  faCart = faCartShopping;
  faSearch = faSearch;

  constructor(private router: Router) {}
  ngOnInit(): void {}


  homePage() {
    this.router.navigate(['/home']);
  }
}
