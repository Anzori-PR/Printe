import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.css',
})
export class CheckoutForm implements OnInit {

  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

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

  submit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    console.log('Form submitted');
    console.log('FORM DATA 👉', this.checkoutForm.value);

  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.checkoutForm.patchValue({
        receipt: file
      });
    }
  }

}
