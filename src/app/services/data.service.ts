import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';

export interface Annonce {
  id?: string;
  title: string;
  description: string;
  prix:number;
  image:string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  constructor(private firestore: Firestore,private storage: Storage) { }

  getAnnonce(): Observable<Annonce[]> {
    const annoncesRef = collection(this.firestore, 'annonces');
    return collectionData(annoncesRef, { idField: 'id'}) as Observable<Annonce[]>;
  }

  getAnnonceById(id:any): Observable<Annonce> {
    const annoncesDocRef = doc(this.firestore, `annonces/${id}`);
    return docData(annoncesDocRef, { idField: 'id' }) as Observable<Annonce>;
  }

  addAnnonce(annonce: Annonce) {
    const annoncessRef = collection(this.firestore, 'annonces');
    return addDoc(annoncessRef, annonce);
  }

  deleteAnnonce(annonce: Annonce) {
    const annoncesDocRef = doc(this.firestore, `annonces/${annonce.id}`);
    return deleteDoc(annoncesDocRef);
  }

  updateAnnonce(annonce: any) {
    const annoncesDocRef = doc(this.firestore, `annonces/${annonce.id}`);
    return updateDoc(annoncesDocRef, { title: annonce.title, description: annonce.description ,prix: annonce.prix ,image:annonce.image});
  }



  getproduitProfile(annonce:any) {
		//const user = this.auth.currentUser;
    const annoncesDocRef = doc(this.firestore, `annonces/${annonce.id}`);
		return docData(annoncesDocRef, { idField: 'id' });
	}

	async uploadPhoto(cameraFile: Photo,annonce:Annonce) {
		//const user = this.auth.currentUser;
    //const annoncesDocRef = doc(this.firestore, `annonces/${annonce.id}`);
		const path = `uploads/${annonce!.id}/profile.webp`;
		const storageRef = ref(this.storage, path);
	  
		try {
		  if (cameraFile.base64String) {
			await uploadString(storageRef, cameraFile.base64String, 'base64');
	  
			const imageUrl = await getDownloadURL(storageRef);
			const userDocRef = doc(this.firestore, `annonces/${annonce!.id}`);
			await setDoc(userDocRef, {
			  imageUrl
			});
			return true;
		  } else {
			throw new Error("cameraFile.base64String est null ou undefined");
		  }
		} catch (e) {
		  console.error(e);
		  return null;
		}
	  }
}