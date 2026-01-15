import { NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.css',
})
export class CheckoutForm implements OnInit {
  @Output() customerInfo = new EventEmitter<any>();
  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    // Initialization logic here
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      bank: ['', Validators.required],
      receipt: [null, Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.checkoutForm.patchValue({
        receipt: file
      });
    }
  }

  submit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this.customerInfo.emit(this.checkoutForm.value);
    localStorage.setItem('customerInfo', JSON.stringify(this.checkoutForm.value));
  }
}
