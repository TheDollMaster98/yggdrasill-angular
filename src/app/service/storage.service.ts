import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
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

  // Questo metodo ottiene un file specifico dallo storage di Firebase
  getFileFromStorage(
    path: string,
    fileName: string
  ): Observable<string | null> {
    // filePath è il percorso completo del file nello storage di Firebase
    const filePath = `${path}/${fileName}`;

    // storageRef è un riferimento al file nello storage di Firebase
    const storageRef = this.storage.ref(filePath);

    // Questo blocco di codice ottiene l'URL di download del file
    return storageRef.getDownloadURL();
  }

  // Questo metodo carica TUTTI i file di un determinato percorso nello storage di Firebase
  pushFilesToStorage(
    files: File[],
    path: string
  ): Observable<number | undefined>[] {
    // Creiamo un array per contenere gli Observable del progresso di caricamento di ciascun file
    const uploadProgressObservables: Observable<number | undefined>[] = [];

    // Iteriamo su ogni file nell'array di file
    for (const file of files) {
      // Carichiamo il file corrente nello storage di Firebase e otteniamo l'Observable del suo progresso di caricamento
      const uploadProgress = this.pushFileToStorage(file, path);

      // Aggiungiamo l'Observable del progresso di caricamento del file corrente all'array
      uploadProgressObservables.push(uploadProgress);
    }

    // Restituiamo l'array di Observable
    return uploadProgressObservables;
  }

  // getDownloadURL(filePath: string): Observable<string> {
  //   // Ottieni l'URL di download per il file specificato nel percorso fornito
  //   const storageRef = this.storage.ref(filePath);

  //   // Converto la promise restituita da getDownloadURL in un Observable
  //   return from(storageRef.getDownloadURL());
  // }

  getDownloadURL(
    filePath: string
  ): Observable<{ url: string; fileName: string }> {
    // Ottieni l'URL di download per il file specificato nel percorso fornito
    const storageRef = this.storage.ref(filePath);

    // Converto la promise restituita da getDownloadURL in un Observable
    return from(storageRef.getDownloadURL()).pipe(
      tap((url) => console.log('URL di download ottenuto:', url)),
      map((url) => ({ url, fileName: this.getFileNameFromPath(filePath) })),
      tap((result) => console.log('Risultato finale:', result))
    );
  }

  private getFileNameFromPath(filePath: string): string {
    // Estrarre il nome del file dal percorso completo del file
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    console.log('Nome del file ottenuto:', fileName);
    return fileName;
  }

  // In storage.service.ts
  // In storage.service.ts
  getDownloadUrl(path: string, fileName: string): string {
    const isLocalEmulator = window.location.hostname === 'localhost';

    if (isLocalEmulator) {
      // Local emulator URL
      return `http://localhost:9199/v0/b/yggdrasill-project.appspot.com/o/${encodeURIComponent(
        path + '/' + fileName
      )}?alt=media`;
    } else {
      // Production URL
      return `https://storage.googleapis.com/yggdrasill-project.appspot.com/${encodeURIComponent(
        path + '/' + fileName
      )}`;
    }
  }
}
