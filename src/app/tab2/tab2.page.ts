import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public salonData: Array<any> = [];
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService.getSalonData().subscribe((res) => {
      this.salonData = res;
    });
  }
}
