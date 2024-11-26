import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit{
  isEditMode: boolean = false;
  form: FormGroup;
  selectedUser:any = null;

  constructor(private fb: FormBuilder,private productService: ProductService,private router:Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
    });
  }
ngOnInit(): void {
  this.productService.selectedUser.subscribe(user => {
    if (user) {
      this.isEditMode = true;
      this.selectedUser = user;
      this.form.patchValue({
        name: user.name,
        price:user.price,
        category:user.category,
      });
    } else {
      this.isEditMode = false;
      this.selectedUser = null;
    }
  });
}

  submit() {
    const newUser = this.form.value;
    if (this.isEditMode && this.selectedUser) {
      // Update user
      console.log('Selected User ID:', this.selectedUser.id);
      newUser.id = this.selectedUser.id;
      this.productService.updateProduct(newUser, this.selectedUser.id).subscribe(
        updatedUser => {
          console.log('User updated successfully:', updatedUser);
          this.router.navigate(['/table'])
          this.productService.selectedUser.next(null); 
        }
      );
    } else {
      // Add user
      this.productService.addProduct(newUser).subscribe(
        addedUser => {
          console.log('User added successfully:', addedUser);
          this.router.navigate(['/table'])
        }
      );
    }
  }
}
