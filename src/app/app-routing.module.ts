import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArtworksComponent} from './artworks/list/artworks.component';
import {AuthGuard} from './services/auth/auth.guard';
import {LoginComponent} from './authentication/login/login.component';
import {CreateArtworkComponent} from './artworks/create/create-artwork.component';

const routes: Routes = [
  {
    path: 'artworks',
    component: ArtworksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'artworks/create',
    component: CreateArtworkComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
