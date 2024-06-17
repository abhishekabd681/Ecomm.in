/**
 * @description
 * This component is responsible to show a checkout form which take all the information like name and address with product details.
 * So that he can checkout the related products.
 * @author
 * Abhishek chauhan
 */
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserdetailService } from 'src/app/services/userdetail.service';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
 submitted:boolean = false;
 checkForm: FormGroup | any;
 constructor(private fb: FormBuilder,
   private userService: UserdetailService,
   private productService: ProductserviceService,
   private route: Router
 ) {}

 ngOnInit(): void {
   this.checkForm = this.fb.group({
    name: [
      '',
      [Validators.required,],
    ],
    address: [
      '',
      [Validators.required,],
    ],
     email: [
       '',
       [Validators.required, Validators.email],
     ],
   });
 }
 get f() {
   return this.checkForm.controls;
 }
  /**
 * @description
 * After fulling all the information when user click on checkout in checkout form we take all information  and navigate him to home.
 * @author
 * Abhishek chauhan
 */
 submit(): void {
   this.submitted =true;
   if (this.checkForm.valid) {
     this.submitted = false;
     this.route.navigate([`/home`])
   }
 }

}
