import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileUploader } from "../../components/features/file-uploader/file-uploader";
import { ProductSelector } from "../../components/features/product-selector/product-selector";
import { CheckoutForm } from "../../components/features/checkout-form/checkout-form";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { OrderStateService } from '../../services/order-state-service';
import { Router } from '@angular/router';
import { OrderDraftService } from '../../services/order-draft';

@Component({
  selector: 'app-order-wizard',
  imports: [CommonModule, FileUploader, ProductSelector, CheckoutForm, FaIconComponent],
  templateUrl: './order-wizard.html',
  styleUrl: './order-wizard.css',
})
export class OrderWizard implements OnInit {

  currentStep: number = 1;

  isOpen = false;
  faTrash = faTrashAlt;
  uploadedFiles: any[] = [];
  resetUploader = false;

  constructor(private orderService: OrderStateService, private router: Router, private orderDraft : OrderDraftService) { }

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

  ngOnInit(): void {
    console.log(this.orderData);
  }

  // როცა მომხმარებელი ირჩევს პროდუქტს (Step 1 -> Step 2)
  onProductSelected(product: any) {
    this.orderData.selectedProduct = product;
  }

  // როცა ფოტოები აიტვირთა (Step 2-ში რჩება ან გადადის Step 3-ზე)
  onFilesUpdated(files: any) {
    this.orderData.uploadedFiles = files;
  }

  onSubmit(customerData: any) {
    this.orderData.customerDetails = customerData;
    console.log('Customer Data:', this.orderData.customerDetails);
    // Create the FormData object
    const formData = new FormData();

    // 1. Append Customer Details
    formData.append('fullName', customerData.name + ' ' + customerData.surname);
    formData.append('phone', customerData.phone);
    formData.append('address', customerData.location);
    formData.append('bank', customerData.bank || 'Not Specified');

    // 2. Append Product Details
    if (this.orderData.selectedProduct) {
      const product: any = this.orderData.selectedProduct;
      formData.append('productName', product.title || 'Photo Print');
      formData.append('productSize', product.size || '9x13');
    }

    // 3. Append the Payment Receipt (if your CheckoutForm provides it)
    if (customerData.receipt) {
      formData.append('receiptImage', customerData.receipt);
    }

    // 4. Append the Photos to print
    this.orderData.uploadedFiles.forEach((fileItem: any) => {
      if (fileItem.file) {
        formData.append('photos', fileItem.file);
      }
    });

    // 5. Send to Backend
    this.orderService.createOrder(formData).subscribe({
      next: () => {

        // Clear state
        this.orderDraft.clear();
        this.orderData.uploadedFiles = [];
        this.resetUploader = true;
        setTimeout(() => this.resetUploader = false);

        this.router.navigate(['/success']);
      },
      error: (err: any) => {
        console.error('Upload failed:', err);
        alert('შეკვეთის გაგზავნა ვერ მოხერხდა');
      }
    });
  }


  // მარტივი ნავიგაცია
  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  togglePopover() {
    this.isOpen = !this.isOpen;
  }
}

