import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  choosenImage: string = '/assets/images/printedImage2.jpg';
  setTab: 'about' | 'prices' | 'delivery' = 'about';
  FaArrowRight = faArrowRight;

  selectTab(tab: 'about' | 'prices' | 'delivery') {
    this.setTab = tab;
  }

  selectImage(img: string) {
    this.choosenImage = img;
  }
}
