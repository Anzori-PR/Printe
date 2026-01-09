import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-selector',
  imports: [CommonModule],
  templateUrl: './product-selector.html',
  styleUrl: './product-selector.css',
})
export class ProductSelector {
  choosenProduct: any = null;

  @Output() productSelected = new EventEmitter<any>();


  chooseProduct(item: any) {
    if (this.choosenProduct === item) {
      this.choosenProduct = null;             // toggle off
      this.productSelected.emit(null);      // notify parent
    } else {
      this.choosenProduct = item;             // select new
      this.productSelected.emit({             // emit selected product
        product: item,
      });
    }
  }


}
