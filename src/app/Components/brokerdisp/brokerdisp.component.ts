import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brokerdisp',
  templateUrl: './brokerdisp.component.html',
  styleUrls: ['./brokerdisp.component.css']
})
export class BrokerdispComponent implements OnInit {
  dispData: any;

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

  editData( id: string) {
    this.router.navigate(['/brokerform/edit', id]);
  }
}
