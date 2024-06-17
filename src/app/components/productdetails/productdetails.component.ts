/**
 * @description
 * Component responsible for displaying detailed information about a single product.
 * Fetches product data based on the productId from ProductService.
 * Supports adding/removing items to/from cart and navigating back to product listings.
 * @author Abhishek Chauhan
 */
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from 'src/app/services/productservice.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute ,
    private productService: ProductserviceService
  ){}
  productDetail:any;
  removeCart:boolean = false;
  productQuantity:number= 1;
  cartData:any;
  ngOnInit(): void {
  let productId= this.activatedRoute.snapshot.paramMap.get('productId');
  this.activatedRoute.paramMap.subscribe(paramMap => {
    const query = paramMap.get('productId');
    if (query) {
      this.getProductDetails(query);
    }
  });
  let user = localStorage.getItem('user');
  if(user){
    let userId= user && JSON.parse(user).id;
    this.productService.getCartList(userId);

    this.productService.cartData.subscribe((result:any)=>{
      let item = result.filter((item:any)=>productId?.toString()===item.productId?.toString())
   if(item.length){
    this.cartData=item[0];
    this.removeCart=true;
   }
    })
  }
  }
  quantity(val:string){
    if(val === 'inc'){
     this.productQuantity = this.productQuantity + 1;
    }if(val === 'dec' && this.productQuantity > 1){
      this.productQuantity = this.productQuantity - 1;
    }
  }
 /**
 * @description
 * Retrieves detailed information of a product based on the provided query (productId).
 * Checks if the product is already present in the local cart and updates `removeCart` flag accordingly.
 * @author Abhishek Chauhan
 */
  getProductDetails(query:any){
   this.productService.getProductDetails(query).then((res) =>{
    this.productDetail = res;
    let cartData= localStorage.getItem('localCart');
    if(query && cartData){
      let items = JSON.parse(cartData);
      items = items.filter((item:any)=> query === item.id.toString());
      if(items.length){
        this.removeCart=true
      }else{
        this.removeCart=false
      }
    }
   })
  }
  /**
 * @description
 * If user is not logged in, directly removes item from local cart using ProductService.
 * If user is logged in, removes item from server cart using ProductService and updates the local cart list.
 * @author Abhishek Chauhan
 */
  removeFromCart(productId:number){
    if(!localStorage.getItem('user')){
    this.productService.removeItemFromCart(productId)
    }else{
      this.cartData && this.productService.removeToCart(this.cartData.id)
      .subscribe((result:any)=>{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        this.productService.getCartList(userId)
      })
    }
    this.removeCart=false
  }
  /**
 * @description
 * Adds the product to the cart.
 * If user is not logged in, adds the product to the local cart.
 * If user is logged in, adds the product to the server cart and updates the local cart list.
 * @author Abhishek Chauhan
 */
  addToCart(){
    if(this.productDetail){
      this.productDetail.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.productService.localAddToCart(this.productDetail);
        this.removeCart=true
      }else{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        let cartData ={
          ...this.productDetail,
          productId:this.productDetail.id,
          userId
        }
        delete cartData.id;
        this.productService.addToCart(cartData).then((result)=>{
          if(result){
           this.productService.getCartList(userId);
           this.removeCart=true
          }
        })
      }

    }
  }

}
