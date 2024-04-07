import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseFirestoreModularService } from '@fire-modular/firebase-firestore-modular.service';
import { SubscriptionManager } from 'rxjs-sub-manager';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { from } from 'rxjs';

@Component({
  selector: 'app-mock-firestore',
  templateUrl: './mock-firestore.component.html',
  styleUrls: ['./mock-firestore.component.scss'],
})
export class MockFirestoreComponent {
  subManager = new SubscriptionManager({
    prefixId: 'mock-firestore-component',
  });

  constructor(
    private angularFirestore: AngularFirestore,
    private firebaseModularService: FirebaseFirestoreModularService
  ) {}

  runClick() {
    this.subManager.closeAll();
    console.clear();
    console.debug('Running mock firestore component');
    this.valueChanges();
    this.add();
  }

  // Write
  private add() {
    this.subManager.add({
      ref: 'add-user',
      sub: this.firebaseModularService
        .addDoc(this.firebaseModularService.collection('users'), {
          name: faker.person.fullName(),
          email: faker.internet.email(),
        })
        .subscribe(),
    });

    this.subManager.add({
      ref: 'add-user-old-way',
      sub: from(
        this.angularFirestore.collection('users').add({
          name: faker.person.fullName(),
          email: faker.internet.email(),
        })
      ).subscribe(),
    });
  }

  // Read
  private valueChanges() {
    this.subManager.add({
      ref: 'users-collection-value-changes',
      sub: this.firebaseModularService
        .collectionSnapshotsChanges(this.firebaseModularService.query('users'))
        .subscribe(users => {
          console.debug({
            message: 'Users collection new way',
            users,
          });
        }),
    });
    this.subManager.add({
      ref: 'users-collection-value-changes-old-way',
      sub: this.angularFirestore
        .collection('users')
        .valueChanges()
        .subscribe(users => {
          console.debug({
            message: 'Users collection old way',
            users,
          });
        }),
    });
  }
}
