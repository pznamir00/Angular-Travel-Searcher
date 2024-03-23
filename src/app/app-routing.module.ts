import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSearchComponent } from './main-search/main-search.component';
import { AirportsLoaderResolver } from './main-search/resolvers/airports-loader.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainSearchComponent,
    resolve: {
      airports: AirportsLoaderResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
