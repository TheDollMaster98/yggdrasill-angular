import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FileUpload } from '../models/file.upload';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  // Metodo per caricare un file nello storage Firebase e salvare i dati correlati nel database
  pushFileToStorage(fileUpload: FileUpload, basePath: string): Observable<any> {
    // Percorso completo del file nello storage
    const filePath = `${basePath}/${fileUpload.file.name}`;
    // Referenza allo storage
    const storageRef = this.storage.ref(filePath);
    // Task di upload del file
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        // Eseguito al completamento dell'upload
        finalize(() => {
          // Ottenere l'URL di download e aggiornare i dati del file
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload, basePath);
          });
        }),
        // Mappare le modifiche della snapshot per includere la chiave nel risultato
        map((changes: any) => {
          return changes.map((c: any) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        })
      )
      .subscribe();

    // Restituire l'observable dei cambiamenti percentuali durante l'upload
    return uploadTask.percentageChanges();
  }

  // Metodo privato per salvare i dati del file nel database Firebase
  private saveFileData(fileUpload: FileUpload, basePath: string): void {
    this.db.list(basePath).push(fileUpload);
  }

  // Metodo per ottenere un elenco di file dal database Firebase limitato al numero specificato
  getFiles(numberItems: number, basePath: string): AngularFireList<FileUpload> {
    return this.db.list(basePath, (ref) => ref.limitToLast(numberItems));
  }

  // Metodo per eliminare un file dal database e dallo storage Firebase
  deleteFile(fileUpload: FileUpload, basePath: string): void {
    // Eliminare il file dal database
    this.deleteFileDatabase(fileUpload.key, basePath)
      .then(() => {
        // Eliminare il file dallo storage
        this.deleteFileStorage(fileUpload.name, basePath);
      })
      .catch((error) => console.log(error));
  }

  // Metodo privato per eliminare un file dal database Firebase
  private deleteFileDatabase(key: string, basePath: string): Promise<void> {
    return this.db.list(basePath).remove(key);
  }

  // Metodo privato per eliminare un file dallo storage Firebase
  private deleteFileStorage(name: string, basePath: string): void {
    const storageRef = this.storage.ref(basePath);
    storageRef.child(name).delete();
  }
}
