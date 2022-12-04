import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-user-salon-services',
  templateUrl: './user-salon-services.page.html',
  styleUrls: ['./user-salon-services.page.scss'],
})
export class UserSalonServicesPage implements OnInit {
  public salonId: string = '';
  public servicesList: Array<any> = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore,
    private toast: ToastController,
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    this.salonId = this.activatedRoute.snapshot.params['id'];

    this.getServices(this.salonId);
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }
  ngOnInit() {}

  getServices(id: any) {
    // get all services by salon ID
    this.firestoreService.getServicesBySalonId(id).subscribe((res) => {
      console.log(res);
      // bind this to a selection form or a dropdown

      this.servicesList = res;
    });
  }
}
