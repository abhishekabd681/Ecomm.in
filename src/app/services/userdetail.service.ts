/**
 * @description
 * This service is responsible for all the centralised data and api which are related to user.
 * It contains the api which are in use for user login and sign up.
 * @author
 * Abhishek chauhan
 */
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdetailService {
  constructor(private http: HttpClient, private router:Router) {
  }
  /**
 * @description
 * This function sends a POST request to the server to register a new user.
 * It returns a promise that resolves with the server's response if the request is successful,
 * or rejects with an error if the request fails.
 * @author
 * Abhishek chauhan
 */
   getSignUp(data:any) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .post(
            'http://localhost:3000/users',
            data
        )
        .toPromise()
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
    return promise;
  }
/**
* @description
 * This function sends a get request to the server for user login.
 * @author
 * Abhishek chauhan
 */
// getLogIn(data: any) {
//   this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' })
//     .pipe(
//       catchError((err) => {
//         console.error('Login failed:', err);
//         return throwError(err);
//       })
//     )
//     .subscribe((result: any) => {
//       if (result && result.body?.length) {
//         localStorage.setItem('user', JSON.stringify(result.body[0]));
//         this.router.navigate(['/']);
//       } else {
//         // Handle invalid credentials or other conditions here
//       }
//     });
// }

getLogIn(data:any) {
  let promise = new Promise((resolve, reject) => {
    this.http
      .get(
          `http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }
      )
      .toPromise()
      .then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
  });
  return promise;
}

}
