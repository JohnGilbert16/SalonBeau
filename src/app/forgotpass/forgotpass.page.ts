import { Component, OnInit } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
})
export class ForgotpassPage implements OnInit {
  constructor(private auth: Auth,private toast:ToastController) { }

  ngOnInit() { }
  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }
  updatePassword() {
    sendPasswordResetEmail(this.auth, 'alcazarjohn643@gmail.com')
      .then((res: any) => {
        // toasat code copy paste
      this.presentToast('Reset link has been sent successfully.')
      })
      .catch((err: any) => {
        console.log(err.code);
      });
  }
}