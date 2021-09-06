import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPageComponent } from './details-page/details-page.component';
import { UsersPageComponent } from './users-page.component';

const routes: Routes = [
	{ path: ':id', component: DetailsPageComponent, data: { breadcrumb: "Details" } },
	{ path: '', pathMatch: "full", component: UsersPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersPageRoutingModule { }
