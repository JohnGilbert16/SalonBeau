import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-user-appointment',
  templateUrl: './user-appointment.page.html',
  styleUrls: ['./user-appointment.page.scss'],
})
export class UserAppointmentPage implements OnInit {
  public name: string = ''; //bind to ion input as [(ngModel)]="name"

  public contactNumber: string = ''; //bind to ion input as [(ngModel)]="contactNumber"
  public address: string = '';
  public services: string = ''; //bind to ion selection or ion select as [(ngModel)]="services"

  public time: string = ''; //same with top
  public date: string = ''; //same with top
  public cost: string = ''; //same with top

  public salonId: string = '';

  public servicesList: Array<any> = [];
  salonServiceParams: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore,
    private toast: ToastController,
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    //salon ID from URL params
    this.salonId = this.activatedRoute.snapshot.params['id'];
    this.salonServiceParams = this.activatedRoute.snapshot.params['service'];

    console.log(this.salonServiceParams);
    this.services = this.salonServiceParams;

    //getting services

    this.getServices(this.salonId);
  }

  clear() {
    this.name = '';

    this.contactNumber = '';
    this.address = '';
    this.services = '';

    this.time = '';
    this.date = '';
    this.cost = '';
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
  addAppointment() {
    // for validation
    if (
      this.name == '' &&
      this.contactNumber == '' &&
      this.services == '' &&
      this.time == '' &&
      this.cost == '' &&
      this.date == ''
    ) {
      this.presentToast('Please fill up all the fields');

      return;
    }

    // for actual data coming from user input
    let data = {
      date: this.date,
      name: this.name,
      salonId: this.salonId,
      service: this.services,
      time: this.time,
      cost: this.cost,
    };

    // for testing
    // let data = {
    // date: new Date().toLocaleDateString(),
    //   name: 'Test Customer',
    //   salonId: this.salonId,
    //   service: 'Haircut (Trim)',
    //   time: new Date().toLocaleTimeString(),
    //   cost: '50',
    // };
    const addAppointment = collection(this.firestore, 'Appointment');

    addDoc(addAppointment, data)
      .then((res) => {
        console.log(res);
        this.presentToast('Appointment added successfully ');

        // this.router.navigate(['/'])   use this to navigate on something
      })
      .catch((err) => {
        console.log(err);
        this.presentToast('Customer successfully registered');
      });
  }
}
