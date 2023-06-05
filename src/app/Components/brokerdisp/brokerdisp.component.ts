import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface BrokerFormData {
  id: string;
  broker: string;
  clientName: string;
  tripId: string;
  insuranceId: string;
  clientId: string;
  phoneNumber: string;
  cellNumber: string;
  pickAddress: string;
  dropAddress: string;
  state: string;
  miles: string;
  cNotes: string;
  escorts: string;
  legs: Leg[];
}

interface Leg {
  pickAddress: string;
  dropAddress: string;
}

@Component({
  selector: 'app-brokerdisp',
  templateUrl: './brokerdisp.component.html',
  styleUrls: ['./brokerdisp.component.css'],
})
export class BrokerdispComponent implements OnInit {
  dispData: BrokerFormData[] = [];
  data!: Observable<BrokerFormData[]>;
  collectionRef: any;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private route: ActivatedRoute
  ) {
    this.collectionRef = collection(this.firestore, 'BrokerTrips');
  }

  ngOnInit(): void {
    const collectionRef = collection(this.firestore, 'BrokerTrips');
    this.data = collectionData(collectionRef) as Observable<BrokerFormData[]>;
    this.fetchData();
  }

  fetchData() {
    this.data = collectionData(this.collectionRef, { idField: 'id' }) as Observable<BrokerFormData[]>;
    this.data.subscribe((data: BrokerFormData[]) => {
      this.dispData = data;
    });
  }
  

  editData(id: string) {
    if (id) {
      this.router.navigate(['/brokerform/edit', id], { relativeTo: this.route });
    }
  }
  deleteData(id: string) {
    if (id) {
      const documentRef = doc(this.firestore, 'BrokerTrips', id);
      deleteDoc(documentRef) 
        .then(() => {
          console.log('Document deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting document: ', error);
        });
    }
  }
}
