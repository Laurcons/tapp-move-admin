import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'auth', loadChildren: () => import('./auth-page/auth-page.module').then((m) => m.AuthPageModule) },
	{ path: 'users', loadChildren: () => import('./users-page/users-page.module').then(m => m.UsersPageModule), canActivate: [AuthGuard] },
	{ path: '', pathMatch: "full", redirectTo: '/auth', },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
