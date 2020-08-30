import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  
  { path: 'login', loadChildren: './account/login/login.module#LoginPageModule' },
  { path: 'forgot', loadChildren: './account/forgot/forgot.module#ForgotPageModule' },
  { path: 'profile', loadChildren: './account/profile/profile.module#ProfilePageModule' },
  { path: 'order', loadChildren: './account/order/order.module#OrderPageModule' },
  { path: 'lang', loadChildren: './lang/lang.module#LangPageModule' },
  { path: 'detail', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'item', loadChildren: './item/item.module#ItemPageModule' },
  { path: 'dboy/:id', loadChildren: './dboy/dboy.module#DboyPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
