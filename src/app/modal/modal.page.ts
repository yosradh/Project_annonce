import { Component, Input, OnInit } from '@angular/core';
import { Annonce, DataService } from '../services/data.service';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string | undefined;
  annonce: Annonce |any;
  presentingElement :null |any;

  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController,private actionSheetCtrl: ActionSheetController) {
    this.presentingElement = document.querySelector('.ion-page');
  }

  ngOnInit() {
    this.dataService.getAnnonceById(this.id).subscribe(res => {
      this.annonce = res;
    });
  }

  async deleteAnnonce() {
    await this.dataService.deleteAnnonce( this.annonce)
    this.modalCtrl.dismiss();
  }

  async updateAnnonce() {
    await this.dataService.updateAnnonce(this.annonce);
    const toast = await this.toastCtrl.create({
      message: 'votre annonce est modifié ...',
      duration: 2000
    });
    toast.present();

  }


  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
          
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === await this.deleteAnnonce();
  };


  
}
