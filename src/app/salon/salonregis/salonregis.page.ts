import { Component, OnInit } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-salonregis',
  templateUrl: './salonregis.page.html',
  styleUrls: ['./salonregis.page.scss'],
})
export class SalonregisPage implements OnInit {
  public contactNumber: string = '';
  public email: string = '';
  public logoUrl: string = '';
  public salonLocation: string = '';
  public salonName: string = '';
  public businessRegistration: string = '';

  file!: File;
  fileRestriction: Array<any> = ['image/jpeg', 'image/png'];
  isFileValid: boolean = true;

  uid: any;

  userData: Array<any> = [];

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private toast: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.uid = this.activatedRoute.snapshot.params['id'];
    console.log(this.uid);
  }

  ngOnInit() {
    if (this.uid) {
      this.getUserData();
    }
  }

  getUserData() {
    const usersDb = collection(this.firestore, 'customer');
    const customerSingle = query(usersDb, where('uid', '==', this.uid));

    getDocs(customerSingle).then((res) => {
      this.userData = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      this.email = this.userData[0].email;
      console.log(this.userData);
    });
  }
  fileChange(event: any) {
    console.log(event.target.files[0]);
    if (this.fileRestriction.includes(event.target.files[0].type)) {
      this.file = event.target.files[0];
      this.isFileValid = true;
      this.presentToast('Logo added');
    } else {
      this.presentToast('Please put a valid logo ');
      this.file = null;
      this.isFileValid = false;
    }
  }
  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }

  uploadFile(event: any) {
    if (
      this.contactNumber == '' &&
      this.businessRegistration == '' &&
      this.email == '' &&
      this.salonName == '' &&
      this.email == ''
    ) {
      this.presentToast('Please fill up the fields ');
      return;
    }
    const storageRef = ref(this.storage, `images/${this.file.name}`);
    const upload = uploadBytesResumable(storageRef, this.file);

    upload.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);

        if (progress === 100) {
          setTimeout(() => {
            getDownloadURL(upload.snapshot.ref).then((url) => {
              this.addSalon(url, upload.snapshot.metadata);
            });
          }, 2000);
        }
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((url) => {
          console.log('dlurl', url);
        });
      }
    );
  }

  addSalon(url: any, meta: any): void {
    let data = {
      businessRegistration: this.businessRegistration,
      contactNumber: this.contactNumber,
      email: this.email,
      logoUrl: url,
      salonLocation: this.salonLocation,
      salonName: this.salonName,

      uid: this.uid,
      ratings: [],
    };

    const addSalon = collection(this.firestore, 'salon');

    addDoc(addSalon, data)
      .then((res) => {
        const key = res['_key'].path.segments[1];
        console.log(res['_key'].path.segments[1]);

        const updateCustomerType = doc(
          this.firestore,
          'customer',
          this.userData[0].id
        );

        let typeData = {
          type: 'salon',
        };
        updateDoc(updateCustomerType, typeData).then((res) => {
          this.presentToast('Salon Registered');

          this.router.navigate(['/saloninter/' + key]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
