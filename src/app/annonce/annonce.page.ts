import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.page.html',
  styleUrls: ['./annonce.page.scss'],
})
export class AnnoncePage implements OnInit {
  images: { image: string, url: string }[] = [];

  constructor( ) { }

  ngOnInit() {
  }


  getImagesDatabase() {
    //this.afDB.list('Images').snapshotChanges(['child_added']).subscribe((images:any) => {
      //images.forEach((image: any) => {
        //this.getImagesStorage(image);
      //});
  //  });
  }


  getImagesStorage(image: any) {
    const imgRef = image.payload.exportVal().ref;
    //this.afSG.ref(imgRef).getDownloadURL().subscribe((imgUrl: any) => {
      //console.log(imgUrl);
      //this.images.push({
        //image: image.payload.exportVal().name,
        //url: image.payload.exportVal().url
      //});
   // });
  }
}
