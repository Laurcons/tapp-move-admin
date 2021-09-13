import { DetailsPageComponent } from './../rides-page/details-page/details-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RidesPageComponent } from './rides-page.component';

const routes: Routes = [
	{ path: ':id', component: DetailsPageComponent, data: { breadcrumb: "Details for ride" } },
	{ path: '', component: RidesPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RidesPageRoutingModule { }
