import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  connectToStorageEmulator(): void {
    if (location.hostname === 'localhost') {
      this.storage.storage.useEmulator('localhost', 9199);
    }
  }

  //TODO: controllare qui, non va
  // Questo metodo carica un file nello storage di Firebase
  pushFileToStorage(file: File, path: string): Observable<number | undefined> {
    // filePath è il percorso completo del file nello storage di Firebase
    const filePath = `${path}/${file.name}`;

    // storageRef è un riferimento al file nello storage di Firebase
    const storageRef = this.storage.ref(filePath);

    // uploadTask è l'operazione di caricamento del file nello storage di Firebase
    const uploadTask = this.storage.upload(filePath, file);

    // Questo blocco di codice si sottoscrive alle modifiche dello stato del task di caricamento
    // e ottiene l'URL di download del file una volta che il caricamento è completato
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            console.log(`File is available at ${downloadURL}`);
          });
        })
      )
      .subscribe();

    // Restituisce un Observable che emette il progresso del caricamento come percentuale
    return uploadTask.percentageChanges();
  }
}
