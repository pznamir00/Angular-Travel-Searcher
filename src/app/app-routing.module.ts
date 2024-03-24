import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSearchComponent } from './main-search/main-search.component';
import { AirportsLoaderResolver } from './results/resolvers/airports-loader.resolver';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: '',
    component: MainSearchComponent,
  },
  {
    path: 'results',
    component: ResultsComponent,
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
