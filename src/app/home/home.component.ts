import { Component, OnInit } from '@angular/core';
import { FirebaseAuthModularService } from '@app/shared/services/firebase/modular/firebase-auth-modular.service';
import { FirebaseFirestoreModularService } from '@fire-modular/firebase-firestore-modular.service';
import { from } from 'rxjs';
import { SubscriptionManager } from 'rxjs-sub-manager';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly subManager = new SubscriptionManager({
    prefixId: 'app-component',
  });
  constructor(
    private firebaseModularService: FirebaseFirestoreModularService,
    public firebaseAuthModularService: FirebaseAuthModularService
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
