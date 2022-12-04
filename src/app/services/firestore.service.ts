import { Injectable } from '@angular/core';
import { Auth, updateProfile } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { from, Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore, private auth: Auth,) {}

  getSalonData(): Observable<any> {
    const salonDb = collection(this.firestore, 'salon');

    return from(
      getDocs(salonDb).then((res) => {
        return [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
      })
    );
  }
  getSalonDataByUid(id): Observable<any> {
    const salonDb = collection(this.firestore, 'salon');
    const salonquery = query(salonDb, where('uid', '==', id));

    return from(
      getDocs(salonquery).then((res) => {
        return [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
      })
    );
  }
  getSpecificSalon(id: any): Observable<any> {
    const salonDb = doc(this.firestore, 'salon/' + id);

    return from(
      getDoc(salonDb).then((res) => {
        return [{ ...res.data(), id: res.id }];
      })
    );
  }

  async signUp(data: any) {
    const usersInstance = collection(this.firestore, 'customer');

    const createUser = await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );

    let data2 = {
      ...data,
      uid: createUser.user.uid,
      type: 'customer',
    };
    return from([
      updateProfile(createUser.user, {
        displayName: data.firstName,
      })
        .then((res) => {
          return [
            addDoc(usersInstance, data2)
              .then((res) => {
                return {
                  status: 'success',
                  message: 'Customer Registered Succesfully',
                };
              })
              .catch((err) => {
                return {
                  status: 'error',
                  message: err,
                };
              }),
          ];
        })

        .catch((err) => {
          return {
            status: 'error',
            message: err,
          };
        }),
    ]);
  }

  // get Appointments

  getAppointments() {
    const appointmentsDb = collection(this.firestore, 'Appointment');

    return from(
      getDocs(appointmentsDb).then((res) => {
        return [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
      })
    );
  }
  getAppointmentsBySalon(id: any) {
    const appointmentsDb = collection(this.firestore, 'Appointment');

    const salonquery = query(appointmentsDb, where('salonId', '==', id),orderBy('date','desc'));

    return from(
      getDocs(salonquery).then((res) => {
        return [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
      })
    );
  }
  // get Specific appoints required ID

  getSpecificAppointments(id: any) {
    const appointmentsDb = doc(this.firestore, 'Appointment/', id);

    return from(
      getDoc(appointmentsDb).then((res) => {
        return [res.data()];
      })
    );
  }

  // get Services per Salon
  getServicesBySalonId(id: any) {
    const services = collection(this.firestore, 'services');

    const servicesQ = query(services, where('salonId', '==', id));

    return from(
      getDocs(servicesQ).then((res) => {
        return [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
      })
    );
  }

  // get feedback

  getfeedback() {
    const feedback = collection(this.firestore, 'feedback');

    return from(
      getDocs(feedback).then((res) => {
        return [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
      })
    );
  }
 
 
  }
  
  
  

