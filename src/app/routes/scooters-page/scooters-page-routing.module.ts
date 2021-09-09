import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScootersPageComponent } from './scooters-page.component';

const routes: Routes = [{ path: '', component: ScootersPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScootersPageRoutingModule { }
