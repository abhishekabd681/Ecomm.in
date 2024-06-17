/**
 * @description
 * Component responsible for displaying a search bar.
 * Allows users to input search queries and navigate to search results.
 * Handles search functionality based on user input.
 * @author Abhishek Chauhan
 */

import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from 'src/app/services/productservice.service';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductserviceService
  ){
  }
  homeProducts:any= [];
  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(paramMap => {
    const query = paramMap.get('query');
    if (query) {
      this.getSearchProducts(query);
    }
  });
  }
  getSearchProducts(query:any){
   this.productService.getSearchProducts(query).then((res) =>{
    this.homeProducts = res;
   })
  }

}
