import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-brokerform',
  templateUrl: './brokerform.component.html',
  styleUrls: ['./brokerform.component.css']
})
export class BrokerformComponent implements OnInit {
  bForm!: FormGroup;
  fieldSelected = false;
  id!: string;
  index!: number;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.index = +this.activatedRoute.snapshot.params['index'];

    this.bForm = this.fb.group({
      broker: [''],
      clientName: [''],
      tripId: [''],
      insuranceId: [''],
      clientId: [''],
      phoneNumber: [''],
      cellNumber: [''],
      pickAddress: [''],
      dropAddress: [''],
      state: [''],
      miles: [''],
      cNotes: [''],
      escorts: [''],
      legs: this.fb.array([]),
    });

    // if (this.id) {
    // this.getBrokerFormData(this.id).subscribe((data: any) => {
    //   if (data) {
    //     this.bForm.patchValue(data);
    //   }
    // });

    const collectionref = collection(this.firestore, 'todo');
    collectionData(collectionref).subscribe(data => {
      console.log('data os ', data);
    }
    )

  }

  getBrokerFormData(id: string) {
    const firebaseURL = 'https://brokerform-2a640-default-rtdb.firebaseio.com/';
    return this.http.get(`${firebaseURL}/brokerforms/${id}.json`);
  }

  onSubmit() {
    const formData = this.bForm.value;

    const firebaseURL = 'https://brokerform-2a640-default-rtdb.firebaseio.com/';
    if (this.id) {
      this.http.put(`${firebaseURL}/brokerforms/${this.id}.json`, formData).subscribe(
        () => {
          console.log('Form data updated in Firebase');
          this.router.navigate(['/brokerdisp']);
        },
        (error) => {
          console.log('Error updating form data in Firebase:', error);
        }
      );
    } else {
      this.http.post(`${firebaseURL}/brokerforms.json`, formData).subscribe(
        () => {
          console.log('Form data sent to Firebase');
          this.router.navigate(['/brokerdisp']);
        },
        (error) => {
          console.log('Error sending form data to Firebase:', error);
        }
      );
    }

    this.bForm.reset();
  }

  brokerSelected(broker: any) {
    this.bForm.patchValue(broker);
  }

  onSelectedBrokerName(val: any) {
    this.bForm.patchValue({
      broker: val,
    });
    this.fieldSelected = true;
  }

  get legControls() {
    return this.bForm.get('legs') as FormArray;
  }

  addLeg() {
    const newLeg = this.fb.group({
      pickAddress: this.bForm.get('dropAddress')?.value,
      dropAddress: this.bForm.get('pickAddress')?.value,
    });

    this.legControls.push(newLeg);
  }
}
