/**
 * @description
 * Component responsible for displaying a list of products on the home page.
 * Retrieves product data from a service.
 * Supports navigation to product details and cart functionalities.
 * @author Abhishek Chauhan
 */
import { Component,OnInit } from '@angular/core';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductserviceService){
  }

  homeProducts:any;

  ngOnInit() {
   this.getProductsdetails();
  }
  getProductsdetails(){
    this.productService.getHomeProducts().then((res) =>{
      this.homeProducts = res;
    })
    }

}
