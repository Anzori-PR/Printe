import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FaIconComponent, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  choosenImage: string = '/assets/images/printedImage1.jpg';
  setTab: 'about' | 'prices' | 'delivery' = 'about';
  FaArrowRight = faArrowRight;

  selectTab(tab: 'about' | 'prices' | 'delivery') {
    this.setTab = tab;
  }

  selectImage(img: string) {
    this.choosenImage = img;
  }
}
