import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
} from '@angular/fire/auth';
import { isUndefined } from 'lodash';
import { BehaviorSubject, catchError, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthModularService {
  private readonly auth: Auth = inject(Auth);
  private readonly user: BehaviorSubject<User | null | undefined> =
    new BehaviorSubject<User | null | undefined>(undefined);

  constructor() {
    this.onAuthStateChanged();
  }

  private onAuthStateChanged() {
    return onAuthStateChanged(this.auth, user => {
      if (user) {
        this.user.next(user);
      } else {
        this.user.next(null);
      }
    });
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(error => {
        console.error('Error signInWithEmailAndPassword: ', error);
        throw error;
      })
    );
  }

  signOut() {
    return from(signOut(this.auth)).pipe(
      catchError(error => {
        console.error('Error signOut: ', error);
        throw error;
      })
    );
  }
  // Getters
  get user$() {
    return this.user.asObservable();
  }

  get initialising$() {
    return this.user$.pipe(map(user => isUndefined(user)));
  }
}
