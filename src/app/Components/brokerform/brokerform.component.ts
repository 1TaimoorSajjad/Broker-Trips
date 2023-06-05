import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  addDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-brokerform',
  templateUrl: './brokerform.component.html',
  styleUrls: ['./brokerform.component.css'],
})
export class BrokerformComponent implements OnInit {
  bForm!: FormGroup;
  fieldSelected = false;
  id!: string;
  index!: number;
  collectionRef: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private firestore: Firestore,
    private route: ActivatedRoute
  ) {
    this.collectionRef = collection(this.firestore, 'BrokerTrips');
  }

  ngOnInit(): void {
    this.bForm = this.fb.group({
      documentId: [''],
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

    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
        this.populateFormWithId(this.id);
      }
    });
  }

  populateFormWithId(id: string) {
    const docRef = doc(this.collectionRef, id);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const formData = docSnap.data();
          formData.documentId = id; // Populate the documentId field
          this.bForm.patchValue(formData);
        } else {
          console.log('Document does not exist');
        }
      })
      .catch((error: any) => {
        console.log('Error retrieving document:', error);
      });
  }

  onSubmit() {
    const formData = this.bForm.value;

    if (formData.documentId) {
      const documentId = formData.documentId;
      delete formData.documentId;

      updateDoc(doc(this.collectionRef, documentId), formData)
        .then(() => {
          console.log('Form data updated in Firestore');
          this.router.navigate(['/brokerdisp']);
        })
        .catch((error: any) => {
          console.log('Error updating form data in Firestore:', error);
        });
    } else {
      addDoc(this.collectionRef, formData)
        .then(() => {
          console.log('Form data sent to Firestore');
          this.router.navigate(['/brokerdisp']);
        })
        .catch((error: any) => {
          console.log('Error sending form data to Firestore:', error);
        });
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
