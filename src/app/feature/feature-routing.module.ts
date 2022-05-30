import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../components/shopping-cart/cart/cart.component';
import { OrderComponent } from '../components/shopping-cart/order/order.component';
import { ProductDetailComponent } from '../components/shopping-cart/product-list/product-detail/product-detail.component';
import { PurchaseOrderComponent } from '../components/shopping-cart/purchase-order/purchase-order.component';
import { AuthGuradGuard } from '../services/auth-gurad.guard';

const routes: Routes = [
  
  {path:'ProductDetail/:id',component:ProductDetailComponent,canActivate:[AuthGuradGuard]},
  {path:'Cart',component:CartComponent,canActivate:[AuthGuradGuard]},
  {path:'Order',component:OrderComponent,canActivate:[AuthGuradGuard]}, 
  {path:'PurchaseOrder',component:PurchaseOrderComponent,canActivate:[AuthGuradGuard]},    
  {path:'PurchaseOrder/:id',component:PurchaseOrderComponent,canActivate:[AuthGuradGuard]}, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
