import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
    {path: 'product-details', loadComponent: () => import('./pages/product-details/product-details').then(m => m.ProductDetails)},
    {path: 'products', loadComponent: () => import('./components/features/product-selector/product-selector').then(m => m.ProductSelector)},
    {path: 'order', loadComponent: () => import('./pages/order-wizard/order-wizard').then(m => m.OrderWizard)},
    {path: 'success', loadComponent: () => import('./pages/success/success').then(m => m.Success)},
    {path: '**', redirectTo: 'home'},
];
