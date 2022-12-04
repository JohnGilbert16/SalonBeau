import { Component, OnInit } from '@angular/core';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  userId: any = localStorage.getItem('user') || null;

  public userData: Array<any> = [];
  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    if (this.userId) {
      const userData = collection(this.firestore, 'customer');

      const userQuery = query(userData, where('uid', '==', this.userId));

      getDocs(userQuery).then((res) => {
        this.userData = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];

        console.log(this.userData);
      });
    } else {
      console.log('Please Login');
    }
  }

  logout() {
    localStorage.clear();
    this.userId = null;
    this.userData = [];
    this.ngOnInit();
  }
}
