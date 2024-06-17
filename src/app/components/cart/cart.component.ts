/**
 * @description
 * This component is responsible to show which products are in the cart of the user.
 * And they can checkout the related products.
 * @author
 * Abhishek chauhan
 */
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartData:any;
  priceSummary:any= {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductserviceService, private router: Router) { }

  ngOnInit(): void {
   this.loadDetails()
  }
 /**
 * @description
 * Removes a product from the cart using its ID and updates the cart details.
 * If the operation is successful, it reloads the cart details and fetches the updated cart list for the user if logged in.
 * @author
 * Abhishek chauhan
 */
  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
      if(localStorage.getItem('user')){
        let userStore:any = localStorage.getItem('user');
        let data = JSON.parse(userStore);
        this.product.getCartList(data.id)
      }
    })
  }
/**
 * @description
 * Loads the current cart details, calculates the price summary, and navigates to the home page if the cart is empty.
 * @author
 * Abhishek chauhan
 */
  loadDetails(){
    this.product.currentCart().subscribe((result:any) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item:any) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

    if(!this.cartData.length){
      this.router.navigate(['/'])
    }

    })
  }
  /**
 * @description
 * Navigates the user to the checkout page.
 * @author
 * Abhishek chauhan
 */
  checkout() {
    this.router.navigate(['/checkout'])
  }
}
