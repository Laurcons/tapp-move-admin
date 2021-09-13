import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RidesPageComponent } from './rides-page.component';

const routes: Routes = [{ path: '', component: RidesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RidesPageRoutingModule { }
