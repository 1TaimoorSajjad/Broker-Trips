import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brokerlist',
  templateUrl: './brokerlist.component.html',
  styleUrls: ['./brokerlist.component.css'],
})
export class BrokerlistComponent {
  @Input() blist: any;
  @Output() selectbrokerData = new EventEmitter<string>();
  selectedBroker: any;
  brokerRef: any;
  brokers: any[] = [
    {
      broker: 'Access2Care',
    },
    {
      broker: 'Abc Insurance',
    },
    {
      broker: 'Logisticare',
    },
    {
      broker: 'MTM',
    },
    {
      broker: 'American Logistics',
    },
    {
      broker: 'VA Premier',
    },
    {
      broker: 'NMN',
    },
    {
      broker: 'MAS',
    },
    {
      broker: 'Verida',
    },
    {
      broker: 'Private Pay',
    },
    {
      broker: 'Medicaid',
    },
    {
      broker: 'Epic',
    },
    {
      broker: 'Amera',
    },
    {
      broker: 'OneCall',
    },
    {
      broker: 'Veyo',
    },
    {
      broker: 'LCP',
    },
    {
      broker: 'Medex',
    },
    {
      broker: 'ARN',
    },
    {
      broker: 'Call the Car',
    },
    {
      broker: 'Modivcare',
    },
    {
      broker: 'WellTrans',
    },
    {
      broker: 'Tennessee Carriers',
    },
    {
      broker: 'SafeRide',
    },
    {
      broker: 'Ride2MD',
    },
    {
      broker: 'IEHP',
    },
    {
      broker: 'CalOptima',
    },
  ];

  constructor(private firestore: Firestore, private router: Router) {
    this.brokerRef = collection(this.firestore, 'BrokerNames');
  }

  ngOnInit() {
    this.fetchBrokers();
  }

  fetchBrokers() {
    getDocs(this.brokerRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const brokerData = doc.data() as { [key: string]: string };
          for (const key in brokerData) {
            if (Object.prototype.hasOwnProperty.call(brokerData, key)) {
              this.brokers.push({ key, broker: brokerData[key] });
            }
          }
        });
      })
      .catch((error: any) => {
        console.log('Error fetching brokers:', error);
      });
  }

  onBrokerSelected(bro: any) {
    this.selectedBroker = bro;
    this.selectbrokerData.emit(this.selectedBroker);
}
}