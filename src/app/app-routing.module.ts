import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'auth', loadChildren: () => import('./routes/auth-page/auth-page.module').then((m) => m.AuthPageModule) },
	{ path: 'users', loadChildren: () => import('./routes/users-page/users-page.module').then(m => m.UsersPageModule), canActivate: [AuthGuard] },
	{ path: '', pathMatch: "full", redirectTo: '/auth', },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
