import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
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
  driverUserId: string | null = null; // Store the id parameter from the URL

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore
  ) {
    this.collectionRef = collection(this.firestore, 'BrokerTrips');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.driverUserId = params['id'];
    });

    const collectionRef = collection(this.firestore, 'BrokerTrips');
    this.data = collectionData(collectionRef) as Observable<BrokerFormData[]>;
    this.fetchData();
  }

  fetchData() {
    this.data.subscribe((data: BrokerFormData[]) => {
      this.dispData = data.map((item) => ({ ...item, id: item.id }));
    });
  }

  editData(id: string) {
    if (id) {
      this.router.navigate(['/brokerform/edit', id]);
    }
  }
}
