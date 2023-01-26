import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './infrastrature/presentation/home/home.component';
import { UsercardComponent } from './infrastrature/presentation/usercard/usercard.component';
import { UserlistComponent } from './infrastrature/presentation/userlist/userlist.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserlistComponent },
  { path: 'user/:id?', component: UsercardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
