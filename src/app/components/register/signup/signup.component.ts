/**
 * @description
 * Registers a new user by sending user data to the server.
 * Sends a POST request to the server with user details for registration.
 * Handles success and error responses from the server during registration.
 * Emits events or updates UI based on the registration response.
 * @author Abhishek Chauhan
 */
import { Component,OnInit } from '@angular/core';
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
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup | any;
  submitted:boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserdetailService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ],
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
    return this.signupForm.controls;
  }
 /**
 * @description
 * Handles form submission for user registration.
 * Sets the submitted flag to true to indicate form submission.
 * Validates the form using Angular reactive forms (`signupForm.valid`).
 * If form is valid, sends user registration data to the server.
 * Resets the form and navigates to login page on successful registration.
 * @author Abhishek Chauhan
 */
  submit(): void {
    this.submitted =true;
    if (this.signupForm.valid) {
      this.submitted = false;
      let payload =
        {
          name: this.signupForm.controls.userName.value,
          email: this.signupForm.controls.email.value,
          password: this.signupForm.controls.password.value,
        }
      this.userService.getSignUp(payload).then((res:any) =>{
        this.signupForm.reset();
        this.route.navigate(['/login']);

      }).catch((err) =>{
       console.log(err);
      })
    }
  }

}
