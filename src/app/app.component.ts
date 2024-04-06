import { Component, OnDestroy, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { SubscriptionManager } from 'rxjs-sub-manager';
import { FirebaseFirestoreModularService } from '@fire-modular/firebase-firestore-modular.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly subManager = new SubscriptionManager({
    prefixId: 'app-component',
  });
  constructor(
    private firebaseModularService: FirebaseFirestoreModularService
  ) {}

  ngOnInit(): void {
    console.clear();
    console.debug('AppComponent initialized');
    this.subManager.add({
      ref: 'users-collection-value-changes',
      sub: from(
        this.firebaseModularService.collectionCount(
          this.firebaseModularService.query('users')
        )
      ).subscribe(users => {
        console.debug({
          message: 'Users collection',
          users,
        });
      }),
    });
  }
  ngOnDestroy(): void {
    console.debug('AppComponent destroyed');
    this.subManager.closeAll();
  }
}
