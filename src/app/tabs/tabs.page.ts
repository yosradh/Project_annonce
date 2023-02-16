import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Annonce, DataService } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  annonce:Annonce[] = [];

  ngOnInit() {
  }

  cliquer(){
    this.NavCtrl.navigateForward('/liste-annonce');
  }

  cliquer1(){
    this.NavCtrl.navigateForward('/modal');
  }


  cliquer2(){
    this.NavCtrl.navigateForward('/home');
  }

    constructor(
      private router: Router,private dataService: DataService,private authService: AuthService,  private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController,private NavCtrl : NavController  ) {
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
          },
          {
            name: 'image',
            placeholder: 'URL IMAGE',
            type: 'text'
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
                title: res.title, description: res.description, prix: res.prix , image:res.image });
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
        breakpoints: [0, 0.5, 0.8],
        initialBreakpoint: 0.8
      });
  
      await modal.present();
    }


    async logout() {
      await this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  
  }

