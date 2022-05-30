import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponentComponent } from './components/shared/page-not-found-component/page-not-found-component.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { OrderComponent } from './components/shopping-cart/order/order.component';
import { ProductDetailComponent } from './components/shopping-cart/product-list/product-detail/product-detail.component';
import { PurchaseOrderComponent } from './components/shopping-cart/purchase-order/purchase-order.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthGuradGuard } from './services/auth-gurad.guard';

const routes: Routes = [
  {path:'',redirectTo:'/shop',pathMatch:'full'}, 
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'shop',component:ShoppingCartComponent,canActivate:[AuthGuradGuard]},
  {path:'**',component:PageNotFoundComponentComponent,canActivate:[AuthGuradGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
