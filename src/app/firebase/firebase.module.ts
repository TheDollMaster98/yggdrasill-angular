import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // AngularFireAuthModule, //auth
    provideAuth(() => getAuth()), //auth
    // AngularFirestoreModule, //cloud firestore
    provideFirestore(() => getFirestore()), //cloud firestore
    provideStorage(() => getStorage()), // cloud storage
    provideDatabase(() => getDatabase()), //realtime db
    provideFunctions(() => getFunctions()), //functions
  ],
})
export class FirebaseModule {}
