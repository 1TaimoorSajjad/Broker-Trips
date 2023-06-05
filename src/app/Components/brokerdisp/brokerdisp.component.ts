import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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
  styleUrls: ['./brokerdisp.component.css']
})
export class BrokerdispComponent implements OnInit {
  dispData: BrokerFormData[] = [];
  data$!: Observable<BrokerFormData[]>;
  collectionRef: any;

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit(): void {
    const collectionRef = collection(this.firestore, 'BrokerTrips');
    this.data$ = this.collectionRef.valueChanges();
    this.fetchData();
  }

  fetchData() {
    this.data$.subscribe((data: BrokerFormData[]) => {
      this.dispData = data;
    });
  }

  editData(id: string) {
    this.router.navigate(['/brokerform/edit', id]);
  }
}
