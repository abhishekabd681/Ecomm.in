/**
 * @description
 * Component responsible for handling user login functionality.
 * Provides a form for users to enter their credentials (username and password).
 * Validates user inputs and initiates authentication process.
 * Redirects authenticated users to the home page or a specified route.
 * Displays error messages for invalid credentials or authentication failures.
 * @author Abhishek Chauhan
 */
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserdetailService } from 'src/app/services/userdetail.service';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup | any;
  submitted:boolean = false;
  wrong:boolean = false;
  constructor(private fb: FormBuilder,
    private userService: UserdetailService,
    private productService: ProductserviceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
      ],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  submit(): void {
    this.submitted =true;
    if (this.loginForm.valid) {
      this.submitted = false;
      let data ={
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
      }
      // this.userService.getLogIn(data);
     this.userService.getLogIn(data).then((res:any) =>{
      if (res && res.body?.length) {
          localStorage.setItem('user', JSON.stringify(res.body[0]));
          this.route.navigate(['/']);
          this.wrong = false;
          this.loginForm.reset();
           }
           else{
            this.wrong = true;
           }
     }).catch((err:any) => {
      this.wrong = true;
      console.log(err);
     })
      setTimeout(() =>{
        this.localCartToRemoteCart();
      },1000)
    }
  }
  /**
 * @description
 * Transfers items from local cart to server-side cart for logged-in user.
 * Retrieves local cart items stored in localStorage and transfers them to the server.
 * Updates server cart with each item and removes local cart data after successful transfer.
 * Finally, updates the UI by fetching the updated cart list from the server.
 * @author Abhishek Chauhan
 */
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;
    if(data){
     let cartDataList= JSON.parse(data);

     cartDataList.forEach((product:any, index:any)=>{
       let cartData={
         ...product,
         productId:product.id,
         userId
       }
       delete cartData.id;
       setTimeout(() => {
         this.productService.addToCart(cartData).then((result)=>{
           if(result){
             console.warn("data is stored in DB");
           }
         })
       }, 500);
       if(cartDataList.length===index+1){
         localStorage.removeItem('localCart')
       }
     })
    }
    setTimeout(() => {
     this.productService.getCartList(userId);
    }, 2000);
   }

}
