import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { where } from 'firebase/firestore';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  uid: any;

  userDataArray: Array<any> = [];
  salonData: Array<any> = [];

  constructor(
    private firestoreService: FirestoreService,
    private firestore: Firestore,
    private router: Router
  ) {
    this.uid = localStorage.getItem('user');
    console.log(this.uid);
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    const userData = collection(this.firestore, 'customer');
    const userSpecific = query(userData, where('uid', '==', this.uid));

    getDocs(userSpecific).then((res) => {
      this.userDataArray = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      this.getSpecificSalon(this.userDataArray[0].email);
      console.log(this.userDataArray);
    });
  }

  getSpecificSalon(email: any) {
    const userData = collection(this.firestore, 'salon');
    const userSpecific = query(userData, where('email', '==', email));

    getDocs(userSpecific).then((res) => {
      this.salonData = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      console.log(this.salonData);
    });
  }

logout() {
  localStorage.removeItem('user');
  this.router.navigateByUrl('/tabs/tab3');

  window.location.href = '/tabs/tab3';
}
}
