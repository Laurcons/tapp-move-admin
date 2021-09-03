import { MainHttpInterceptor } from './http-interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthPageModule } from './auth-page/auth-page.module';
import { HttpClientModule } from "@angular/common/http";

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		AuthPageModule,
		HttpClientModule,
		MatCardModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MainHttpInterceptor,
			multi: true,
		},
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'fill' },
		},
		{
			provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
			useValue: { duration: 5000 },
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
