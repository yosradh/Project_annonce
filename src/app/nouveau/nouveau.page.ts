import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import {  Firestore } from '@angular/fire/firestore';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.page.html',
  styleUrls: ['./nouveau.page.scss'],
})
export class NouveauPage implements OnInit {
  selectedFile: File | null = null;

  constructor(private afStorage: Storage,private dataService: DataService) { }

  ngOnInit() {
  }

  addItem(articleForm: NgForm) {
    if (articleForm.valid && this.selectedFile) {
      const file = this.selectedFile;
      const filePath = `articles/${file.name}`;
      const fileRef = this.afStorage['ref'](filePath);
      const task = fileRef.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((downloadUrl:any) => {
            const article = {
              title: articleForm.value.title,
              description: articleForm.value.description,
              prix: articleForm.value.prix,
              image: downloadUrl
            };
                this.dataService.addAnnonce(article);
                  console.log("l'insertion est bien fait");
                  

            // Réinitialiser le formulaire
            articleForm.reset();
            this.selectedFile = null;
          });
        })
      ).subscribe();
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // ...
}
