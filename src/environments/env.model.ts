import { FirebaseOptions } from 'firebase/app';

export interface EnvironmentModel {
  production: boolean;
  firebaseConfig: FirebaseOptions;
}
