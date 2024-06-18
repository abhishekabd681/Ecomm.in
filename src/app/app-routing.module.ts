import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { LoginComponent } from './components/register/login/login.component';
import { SignupComponent } from './components/register/signup/signup.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from './auth.guard';

const routes: Routes = [{
  path:'',
  component: HomeComponent
},
{
  path: 'home',
  component: HomeComponent
},
  {
  path: 'cart',
  component : CartComponent,
  canActivate: [authGuard]
},
{
  path: 'search/:query',
  component : SearchbarComponent,
},
{
  path: 'detail/:productId',
  component : ProductdetailsComponent,
},
{
  path: 'login',
  component : LoginComponent,
},
{
  path: 'checkout',
  component : CheckoutComponent,
  canActivate: [authGuard]
},
{
  path: 'signup',
  component : SignupComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
