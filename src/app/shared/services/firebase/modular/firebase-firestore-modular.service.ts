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
} from '@angular/fire/firestore';
import { from, map } from 'rxjs';

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

  collectionData<T = DocumentData>(query: Query<T>) {
    return collectionData(query);
  }

  collectionGet<T = DocumentData>(query: Query<T>) {
    return getDocs(query);
  }

  collectionCount<T = DocumentData>(query: Query<T>) {
    return from(getCountFromServer(query)).pipe(map(count => count.data()));
  }

  addDoc<T = DocumentData>(
    reference: CollectionReference<T>,
    data: WithFieldValue<T>
  ) {
    return addDoc(reference, data);
  }

  updateDoc<T = DocumentData>(
    reference: DocumentReference<T>,
    data: UpdateData<T>
  ) {
    return updateDoc(reference, data);
  }

  setDoc<T = DocumentData>(
    reference: DocumentReference<T>,
    data: PartialWithFieldValue<T>,
    setOptions: SetOptions = { merge: true }
  ) {
    return setDoc(reference, data, setOptions);
  }
}
