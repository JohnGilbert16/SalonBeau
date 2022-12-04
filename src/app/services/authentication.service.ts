import { Injectable } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention

import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router,
    private toast: ToastController
  ) {
    // this.loadToken();
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }

  loginUser(email: any, password: any) {
    const loginQuery = collection(this.firestore, 'customer');

    const q = query(loginQuery, where('email', '==', email));

    getDocs(q).then((res: any) => {
      const userData = [
        ...res.docs.map((doc: any) => {
          return { id: doc.id, ...doc.data() };
        }),
      ];

      if (userData[0].type === 'customer') {
        signInWithEmailAndPassword(this.auth, email, password)
          .then((res: any) => {
            if (res) {
              localStorage.setItem('token', res.user.accessToken);
              localStorage.setItem('user', res.user.uid);

              window.location.href = '/';

              this.router.navigate(['/']);
            }
          })
          .catch((err: any) => {
            if (err.code == 'auth/invalid-email') {
              this.presentToast('Invalid email ');
            }
            if (err.code == 'auth/missing-email') {
              this.presentToast('Missing email');
            }
            if (err.code == 'auth/internal-error') {
              this.presentToast('Missing password');
            }
            if (err.code == 'auth/wrong-password') {
              this.presentToast('Wrong password');
            }
            if (err.code == 'auth/user-not-found') {
              this.presentToast('User not found');
            }
          });
      } else if (userData[0].type === 'salon') {
        signInWithEmailAndPassword(this.auth, email, password)
          .then((res: any) => {
            if (res) {
              localStorage.setItem('token', res.user.accessToken);
              localStorage.setItem('user', res.user.uid);

              window.location.href = '/dashboard';
              // this.router.navigate(['/dashboard']);
            }
          })
          .catch((err: any) => {
            if (err.code == 'auth/invalid-email') {
              this.presentToast('Invalid email ');
            }
            if (err.code == 'auth/missing-email') {
              this.presentToast('Missing email');
            }
            if (err.code == 'auth/internal-error') {
              this.presentToast('Missing password');
            }
            if (err.code == 'auth/wrong-password') {
              this.presentToast('Wrong password');
            }
            if (err.code == 'auth/user-not-found') {
              this.presentToast('User not found');
            }
          });
      } else {
        this.presentToast('User not found');
      }
    });
  }

  salonLogin(email: any, password: any) {
    const loginQuery = collection(this.firestore, 'customer');

    const q = query(loginQuery, where('email', '==', email));

    getDocs(q).then((res: any) => {
      const userData = [
        ...res.docs.map((doc: any) => {
          return { id: doc.id, ...doc.data() };
        }),
      ];

      if (userData[0].type === 'salon') {
        signInWithEmailAndPassword(this.auth, email, password)
          .then((res: any) => {
            if (res) {
              localStorage.setItem('token', res.user.accessToken);
              localStorage.setItem('user', res.user.uid);
              this.router.navigate(['dashboard']);
            }
          })
          .catch((err: any) => {
            if (err.code == 'auth/invalid-email') {
              this.presentToast('Invalid email ');
            }
            if (err.code == 'auth/missing-email') {
              this.presentToast('Missing email');
            }
            if (err.code == 'auth/internal-error') {
              this.presentToast('Missing password');
            }
            if (err.code == 'auth/wrong-password') {
              this.presentToast('Wrong password');
            }
            if (err.code == 'auth/user-not-found') {
              this.presentToast('User not found');
            }
          });
      } else {
        signInWithEmailAndPassword(this.auth, email, password)
          .then((res: any) => {
            if (res) {
              localStorage.setItem('token', res.user.accessToken);
              localStorage.setItem('user', res.user.uid);
              this.router.navigate(['/']);
            }
          })
          .catch((err: any) => {
            if (err.code == 'auth/invalid-email') {
              this.presentToast('Invalid email ');
            }
            if (err.code == 'auth/missing-email') {
              this.presentToast('Missing email');
            }
            if (err.code == 'auth/internal-error') {
              this.presentToast('Missing password');
            }
            if (err.code == 'auth/wrong-password') {
              this.presentToast('Wrong password');
            }
            if (err.code == 'auth/user-not-found') {
              this.presentToast('User not found');
            }
          });
      }
    });
  }
}
