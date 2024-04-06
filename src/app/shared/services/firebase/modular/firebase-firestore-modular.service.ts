import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  PartialWithFieldValue,
  Query,
  QueryCompositeFilterConstraint,
  SetOptions,
  UpdateData,
  WithFieldValue,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  docSnapshots,
  getCountFromServer,
  getDocs,
  query,
  setDoc,
  updateDoc,
  collectionSnapshots,
} from '@angular/fire/firestore';
import { catchError, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestoreModularService {
  private readonly firestore: Firestore = inject(Firestore);

  doc(path: string) {
    return doc(this.firestore, path);
  }

  docData<T = DocumentData>(doc: DocumentReference<T>) {
    return docData(doc);
  }

  docSnapshots<T = DocumentData>(doc: DocumentReference<T>) {
    return docSnapshots(doc);
  }

  collection(path: string) {
    return collection(this.firestore, path);
  }

  query(
    path: string,
    queryFieldFilterConstraint?: QueryCompositeFilterConstraint | undefined
  ) {
    if (queryFieldFilterConstraint) {
      return query(this.collection(path), queryFieldFilterConstraint);
    }
    return query(this.collection(path));
  }

  collectionValueChanges<T = DocumentData>(query: Query<T>) {
    return collectionData(query).pipe(
      catchError(error => {
        console.error('Error collectionValueChanges: ', error);
        throw error;
      })
    );
  }

  collectionSnapshotsChanges<T = DocumentData>(query: Query<T>) {
    return collectionSnapshots(query).pipe(
      catchError(error => {
        console.error('Error collectionSnapshotsChanges: ', error);
        throw error;
      })
    );
  }

  collectionGet<T = DocumentData>(query: Query<T>) {
    return from(getDocs(query)).pipe(
      catchError(error => {
        console.error('Error collectionGet: ', error);
        throw error;
      })
    );
  }

  collectionCount<T = DocumentData>(query: Query<T>) {
    return from(getCountFromServer(query))
      .pipe(map(count => count.data()))
      .pipe(
        catchError(error => {
          console.error('Error collectionCount: ', error);
          throw error;
        })
      );
  }

  addDoc<T = DocumentData>(
    reference: CollectionReference<T>,
    data: WithFieldValue<T>
  ) {
    return from(addDoc(reference, data)).pipe(
      catchError(error => {
        console.error('Error addDoc: ', error);
        throw error;
      })
    );
  }

  updateDoc<T = DocumentData>(
    reference: DocumentReference<T>,
    data: UpdateData<T>
  ) {
    return from(updateDoc(reference, data)).pipe(
      catchError(error => {
        console.error('Error updateDoc: ', error);
        throw error;
      })
    );
  }

  setDoc<T = DocumentData>(
    reference: DocumentReference<T>,
    data: PartialWithFieldValue<T>,
    setOptions: SetOptions = { merge: true }
  ) {
    return from(setDoc(reference, data, setOptions)).pipe(
      catchError(error => {
        console.error('Error setDoc: ', error);
        throw error;
      })
    );
  }
}
