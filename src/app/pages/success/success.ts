import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class Success implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  MainPage() {
    this.router.navigate(['/home']);
  }

}
