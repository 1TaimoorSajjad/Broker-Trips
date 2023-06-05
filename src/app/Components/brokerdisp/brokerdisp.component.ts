import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const firebaseURL = 'https://brokerform-2a640-default-rtdb.firebaseio.com/';
    this.http.get(`${firebaseURL}/brokerforms.json`).subscribe((data: any) => {
      if (data) {
        this.dispData = Object.keys(data).map((key) => {
          return { id: key, ...data[key] };
        });
      }
    });
  }

  editData(id: string) {
    this.router.navigate(['/brokerform/edit', id]);
  }
}
