import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { ItemEditComponent } from './item-edit/item-edit.component';

const routes: Routes = [
  {
    path: 'items',
    component: ItemsComponent,
    data: { title: 'List of Items' }
  },
  {
    path: 'item-details/:id',
    component: ItemDetailComponent,
    data: { title: 'Item Details' }
  },
  {
    path: 'item-add',
    component: ItemAddComponent,
    data: { title: 'Add Item' }
  },
  {
    path: 'item-edit/:id',
    component: ItemEditComponent,
    data: { title: 'Edit Item' }
  },
  { path: '',
    redirectTo: '/items',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
