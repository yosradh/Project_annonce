import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
		...canActivate(redirectLoggedInToHome)
	},
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
		...canActivate(redirectUnauthorizedToLogin)
	},
	
  {
    path: 'annonce',
    loadChildren: () => import('./annonce/annonce.module').then( m => m.AnnoncePageModule),
	...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'liste-annonce',
    loadChildren: () => import('./liste-annonce/liste-annonce.module').then( m => m.ListeAnnoncePageModule),
	...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule),
	...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'liste-annonce',
    loadChildren: () => import('./liste-annonce/liste-annonce.module').then( m => m.ListeAnnoncePageModule),
	...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule]
})
export class AppRoutingModule {}