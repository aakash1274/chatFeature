
import { Injectable, inject } from '@angular/core';
import { GoogleAuthProvider, User, getAuth, signInWithPopup, signOut } from '@angular/fire/auth';

import { Firestore, collection, doc, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = getAuth();
  USER =  'user';
  CURENT_USER = 'current_user'
  router: Router = inject(Router);

  constructor(private firestore: Firestore) { }


  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(getAuth(), provider);
  }

  async getUserFromDb(userId: string){
    const docRef = doc(this.firestore, this.USER, userId);
    const userDoc = await getDoc(docRef);
    return userDoc.data();
  }


  async getUserById() {
    const docRef = doc(this.firestore, this.USER, this.getCurrentUser().uid);
    const userDoc = await getDoc(docRef);
    return userDoc.data();
  }


  addUserData(user: User, userData: {name: string} | null){
    const collectionRef = collection(this.firestore, this.USER);

    const queryRef = query(collectionRef, where('userId', '==', user.uid));

    const allDocs = getDocs(queryRef).then( async (result) =>{
      if(result.size == 0){
        const docRef = doc(this.firestore, this.USER, user.uid);
        if(userData){
          await setDoc(docRef, {
            fullName: userData !== null ? userData.name : '',
            userId: user.uid,
            profile: user.photoURL
          }, {merge: true});
        } else {
          await setDoc(docRef, {
            fullName: user.displayName,
            userId: user.uid,
            profile: user.photoURL
          }, {merge: true});
        }
      } 
    })
  } 

  getCurrentUser(){
    return JSON.parse(localStorage.getItem(this.CURENT_USER) || '{}') as User;
  }

  setCurrentUser(currentUser: User) {
    localStorage.setItem(this.CURENT_USER, JSON.stringify(currentUser));

  }

  async logoutUser() {
    await signOut(this.auth);
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
