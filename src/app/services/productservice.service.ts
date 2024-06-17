/**
 * @description
 * This service is responsible for all the centralised data and api which are related to product.
 * Like list of products,cart product list,search list and product details.
 * @author
 * Abhishek chauhan
 */
import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  cartData = new EventEmitter<any>();
  constructor(private http: HttpClient) { }
  /**
 * @description
 * This getHomeProducts function is responsible to get the list of all the products which are coming in the home.
 * In this function we are hitting one api which fetches the list of home products from the server.
 * @author
 * Abhishek chauhan
 */
  getHomeProducts() {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(
            'http://localhost:3000/products?',
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
 * This currentCart function is responsible to get the updated list of all the products which are added in the cart.
 * In this function we are hitting one api which fetches the list of updated cart list from the server.
 * @author
 * Abhishek chauhan
 */
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get('http://localhost:3000/cart?userId=' + userData.id);
  }
    /**
 * @description
 * This getsearchproducts function is responsible to get the  list of related  products which are related to that keyword which is typed in search bar.
 * In this function we are hitting one api which fetches products from the server based on the search query
 * @author
 * Abhishek chauhan
 */
  getSearchProducts(query:string) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(
            `http://localhost:3000/products?q=${query}`,
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
 * This getProductDetails function is responsible for getting the details of a specific product based on the product ID.
 * In this function, we are hitting an API which fetches the product details from the server using the product ID.
 * @author
 * Abhishek Chauhan
 */
  getProductDetails(id:string) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(
            `http://localhost:3000/products/${id}`,
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
 * This addToCart function is responsible for adding a product to the cart.
 * In this function, we are hitting an API which posts the product data to the server to add it to the cart.
 * @author
 * Abhishek Chauhan
 */
  addToCart(data:any) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .post(
            'http://localhost:3000/cart',
            data
        )
        .toPromise()
        .then(
          (res:any) => {
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
 * This localAddToCart function is responsible for adding a product to the cart in the local storage.
 * It checks if there is an existing cart in the local storage; if not, it creates a new one.
 * If a cart exists, it adds the product to the existing cart and emits the updated cart data.
 * @author
 * Abhishek Chauhan
 */
  localAddToCart(data:any) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
 /**
 * @description
 * This removeToCart function is responsible for removing a product from the cart based on its ID.
 * It sends a DELETE request to the server to remove the specified product from the cart.
 * @author
 * Abhishek Chauhan
 */
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
 /**
 * @description
 * This removeItemFromCart function is responsible for removing a product from the cart in the local storage based on its ID.
 * It retrieves the current cart from local storage, filters out the specified product, updates the local storage, and emits the updated cart data.
 * @author
 * Abhishek Chauhan
 */
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item:any) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
 /**
 * @description
 * This getCartList function is responsible for fetching the cart items for a specific user based on the user ID.
 * It sends a GET request to the server, observes the full HTTP response, and emits the cart data if available.
 * @author
 * Abhishek Chauhan
 */
  getCartList(userId: number) {
    return this.http
      .get('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result:any) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
}
