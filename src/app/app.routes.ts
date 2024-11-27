import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"home",
        loadComponent:()=> import('./home/home.component').then(x=>x.HomeComponent)
    },
    {
        path:"location/:id",
        loadComponent:()=> import('./location/location.component').then(x=>x.LocationComponent)
    },
    {
        path:"",
        redirectTo:"home",
        pathMatch:'full'
    }
];
