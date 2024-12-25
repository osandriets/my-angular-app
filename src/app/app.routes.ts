import { Routes } from '@angular/router';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroesListComponent,
  },
];
