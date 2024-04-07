import { Component } from '@angular/core';
import { FirebaseAuthModularService } from '@app/shared/services/firebase/modular/firebase-auth-modular.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public firebaseAuthModularService: FirebaseAuthModularService) {}
}
