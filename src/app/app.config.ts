import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
 import {provideFirebaseApp, initializeApp} from '@angular/fire/app'
import { firebaseConfig } from './firebase/firebase-config';
import { provideAnimations } from '@angular/platform-browser/animations'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideToastr(),
    provideAnimations()
  ]
};
