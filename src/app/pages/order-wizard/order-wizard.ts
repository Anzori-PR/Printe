import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploader } from "../../components/features/file-uploader/file-uploader";
import { ProductSelector } from "../../components/features/product-selector/product-selector";
import { CheckoutForm } from "../../components/features/checkout-form/checkout-form";

@Component({
  selector: 'app-order-wizard',
  imports: [CommonModule, FileUploader, ProductSelector, CheckoutForm],
  templateUrl: './order-wizard.html',
  styleUrl: './order-wizard.css',
})
export class OrderWizard {
  @Output() productSelected = new EventEmitter<any>();
  currentStep: number = 1;

  // 2. შეკვეთის დროებითი მონაცემები (State)
  orderData = {
    selectedProduct: null, // მაგ: { type: 'polaroid', price: 0.50 }
    uploadedFiles: [] as any[],     // ფოტოების სია
    customerDetails: null  // სახელი, გვარი...
  };

  // ნაბიჯების სახელები (ვიზუალისთვის)
  steps = [
    { number: 1, title: 'აირჩიე ზომა' },
    { number: 2, title: 'ატვირთე ფოტოები' },
    { number: 3, title: 'გადახდა' }
  ];

  // --- LOGIC ---

  // როცა მომხმარებელი ირჩევს პროდუქტს (Step 1 -> Step 2)
  onProductSelected(product: any) {
    this.orderData.selectedProduct = product;
    this.nextStep();
  }

  // როცა ფოტოები აიტვირთა (Step 2-ში რჩება ან გადადის Step 3-ზე)
  onFilesUpdated(files: any) {
    this.orderData.uploadedFiles = files;
  }

  // მარტივი ნავიგაცია
  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
    // აქ შეგიძლია დაამატო "სქროლი ზევით" ლოგიკა
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }
}

