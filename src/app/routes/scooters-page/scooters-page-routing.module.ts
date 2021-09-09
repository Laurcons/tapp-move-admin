import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPageComponent } from './details-page/details-page.component';
import { ScootersPageComponent } from './scooters-page.component';

const routes: Routes = [
	{ path: '', component: ScootersPageComponent },
	{ path: ':id', component: DetailsPageComponent, data: { breadcrumb: { label: "Details" } } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScootersPageRoutingModule { }
