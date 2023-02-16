import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeAnnoncePageRoutingModule } from './liste-annonce-routing.module';

import { ListeAnnoncePage } from './liste-annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeAnnoncePageRoutingModule
  ],
  declarations: [ListeAnnoncePage]
})
export class ListeAnnoncePageModule {}
