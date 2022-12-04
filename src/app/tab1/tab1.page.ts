import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public salonData: Array<any> = [];

  constructor(
    private navCtrl: NavController,
    private firestoreService: FirestoreService
  ) {}
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    autoplay: true,
  };

  ngOnInit(): void {
    this.getSalonDB();
  }

  getSalonDB() {
    this.firestoreService.getSalonData().subscribe((res) => {
      this.salonData = res;

      console.log(res);
    });
  }

  getAverage(rating: any) {
    if (rating.length == 0) {
      return 0;
    }

    let sum = 0;

    rating.forEach((element) => {
      // console.log(Number(element));

      sum = sum + Number(element);
    });

    // console.log(sum / rating.length);

    return sum / rating.length;
  }
}
