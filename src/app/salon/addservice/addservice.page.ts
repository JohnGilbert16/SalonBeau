import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.page.html',
  styleUrls: ['./addservice.page.scss'],
})
export class AddservicePage implements OnInit {
  public cost: string = '';
  public category: string = '';
  public subCategory: string = '';
  public salonId: string = '';
  userId: any = localStorage.getItem('user');

  constructor(
    private firestore: Firestore,
    private firestoreService: FirestoreService,
    private toast: ToastController,
    private router: Router
  ) {}
  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }

  clear() {
    (this.category = ''), (this.cost = ''), (this.subCategory = '');
  }
  ngOnInit() {
    this.getSalonData();
  }
  getSalonData() {
    // returns the salon of a user; depends on user ID
    this.firestoreService.getSalonDataByUid(this.userId).subscribe((res) => {
      console.log(res);

      this.salonId = res[0].id;
      this.getServices(res[0].id);
    });
  }

  // adding services
  addServices() {
    // validation if fields are empty
    if (this.cost == '' && this.category == '' && this.subCategory == '') {
      this.presentToast('Please fill up the fields ');
      this.clear();

      return;
    }

    // validation if no salon

    if (!this.salonId) {
      this.presentToast('Please select a salon ');
      this.clear();

      return;
    }

    // object to be passed on firebase, please see the table and compare
    let data = {
      category: this.category,
      cost: this.cost,
      salonId: this.salonId,

      subCategory: this.subCategory,
    };
    // firestore database instance

    const servicesInstance = collection(this.firestore, 'services');
    // firebase functin for adding data to services table
    addDoc(servicesInstance, data)
      .then((res) => {
        this.clear();
        this.presentToast('Service added');

        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        this.clear();

        console.log(err);
      });
  }

  // gettingServices by salon Id
  getServices(id) {
    console.log(this.salonId);
    this.firestoreService.getServicesBySalonId(id).subscribe((res) => {
      console.log(res);
    });
  }
}
