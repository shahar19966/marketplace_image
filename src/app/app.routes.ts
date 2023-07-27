import { Routes } from '@angular/router';
import { ImagesComponent } from './images/images.component';
import { NewItemComponent } from './images/new-item/new-item.component';
import { deactivationGuard } from './guards/deactivation.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/images-list', pathMatch: 'full' },
  { path: 'images-list', component: ImagesComponent },
  {
    path: 'new-item',
    component: NewItemComponent,
    canDeactivate: [deactivationGuard],
  },
];
