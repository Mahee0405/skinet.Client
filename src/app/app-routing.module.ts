import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './src/app/core/not-found/not-found.component';
import { ServerErrorComponent } from './src/app/core/server-error/server-error.component';
import { HomeComponent } from './src/app/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'shop', loadChildren: () => import('./src/app/shop/shop.module').then(mod => mod.ShopModule)
    , data: { breadcrumb: 'Shop' }
  },
  {
    path: 'basket', loadChildren: () => import('./src/app/basket/basket.module').then(mod => mod.BasketModule)
    , data: { breadcrumb: 'basket' }
  },
  {
    path: 'checkout', loadChildren: () => import('./src/app/checkout/checkout.module').then(mod => mod.CheckoutModule)
    , data: { breadcrumb: 'basket' }
  },
  { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Server Error' } },
  { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Not Found' } },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
