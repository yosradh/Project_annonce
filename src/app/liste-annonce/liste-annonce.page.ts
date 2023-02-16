import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { DataService,Annonce } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-liste-annonce',
  templateUrl: './liste-annonce.page.html',
  styleUrls: ['./liste-annonce.page.scss'],
})
export class ListeAnnoncePage implements OnInit {
  annonce:Annonce[] = [];

  ngOnInit() {}
  
    constructor(private dataService: DataService, private navCtrl : NavController, private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) {
      this.dataService.getAnnonce().subscribe(res => {
        this.annonce = res;
        this.cd.detectChanges();
      });
    }
  
    async additems() {
      const alert = await this.alertCtrl.create({
        header: 'Add Annonce',
        inputs: [
          {
            name: 'title',
            placeholder: 'title',
            type: 'text'
          },
          {
            name: 'description',
            placeholder: 'description',
            type: 'textarea'
          },
          {
            name: 'prix',
            placeholder: 'prix',
            type: 'number'
          }
          ,
          {
            name: 'image',
            placeholder: 'prix',
            type:'text'
          }
          
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          }, {
            text: 'Add',
            handler: res => {
              this.dataService.addAnnonce({
                title: res.title, description: res.description, prix: res.prix, image: res.image});
            }
          }
        ]
      });
  
      await alert.present();
    }
  
    async openAnnonce(annonce: any) {
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: { id: annonce.id },
        breakpoints: [0, 0.5, 0.8,0.5],
        initialBreakpoint: 0.2
      });
  
      await modal.present();
    }

    
  Afficher(){
    console.log("hello");
    this.navCtrl.navigateForward('/login');
  }

  }