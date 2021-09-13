import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RidesPageRoutingModule } from './rides-page-routing.module';
import { RidesPageComponent } from './rides-page.component';


@NgModule({
  declarations: [
    RidesPageComponent
  ],
  imports: [
    CommonModule,
    RidesPageRoutingModule
  ]
})
export class RidesPageModule { }
