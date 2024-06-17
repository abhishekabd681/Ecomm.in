/**
 * @description
 * The Header Component represents the top navigation bar of the e-commerce application.
 * It includes the e-commerce logo on the left, a search bar in the center, and action buttons
 * (Home, Login, Cart) aligned to the right.
 * Components:
 * - E-commerce Logo: Displays the logo of the e-commerce platform.
 * - Search Bar: Allows users to search for products within the e-commerce platform.
 * - Action Buttons:
 *   - Home: Navigates users to the home page of the application.
 *   - Login: Redirects users to the login page for authentication.
 *   - Cart: Directs users to view the items added to their shopping cart.
 * @author
 * [Your Name or Team Name]
 */
import { Component,OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductserviceService } from 'src/app/services/productservice.service';
import { UserdetailService } from 'src/app/services/userdetail.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isNavbarCollapsed = false;
  logout:boolean = false;
  cartData:number = 0;

  constructor(private route: Router,
    private userservice: UserdetailService,
    private productService: ProductserviceService,
  ){}
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if(localStorage.getItem('user')){
          let userStore:any = localStorage.getItem('user');
          let data = JSON.parse(userStore);
          this.logout=true;
          this.productService.getCartList(data.id)
        }
         else {
          this.logout = false;
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartData= JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items)=>{
      this.cartData= items.length
    })
  }
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  submitSearch(val:any){
    this.route.navigate([`search/${val}`])
  }
  goLogout(){
    localStorage.removeItem('user');
    this.productService.cartData.emit([]);
    this.route.navigate(['/home']);
    this.logout = false;
  }
}
