import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeAnnoncePage } from './liste-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: ListeAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeAnnoncePageRoutingModule {}
