import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-apptsched',
  templateUrl: './apptsched.page.html',
  styleUrls: ['./apptsched.page.scss'],
})
export class ApptschedPage implements OnInit {
  public appointments: Array<any> = [];

  userId: any = localStorage.getItem('user');
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.getSalonData();
  }

  getSalonData() {
    // returns the salon of a user; depends on user ID
    this.firestoreService.getSalonDataByUid(this.userId).subscribe((res) => {
      console.log(res);

      this.getSalonAppointment(res[0].id);
    });
  }

  getSalonAppointment(id: any) {
    // returns the appointments based on salon
    this.firestoreService.getAppointmentsBySalon(id).subscribe((res) => {
      console.log(res);

      this.appointments = res;
    });
  }
}
