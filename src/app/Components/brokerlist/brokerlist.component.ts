import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-brokerlist',
  templateUrl: './brokerlist.component.html',
  styleUrls: ['./brokerlist.component.css']
})
export class BrokerlistComponent {
  @Input() blist: any
  @Output() selectbrokerData = new EventEmitter<string>()
  selectedBroker: any;
  brokers: any[] = 
  [
    {
      broker: 'Access2Care'
    },
    {
      broker: 'Abc Insurance'
    },
    {
      broker: 'Logisticare'
    },
    {
      broker: 'MTM'
    },
    {
      broker: 'American Logistics'
    },
    {
      broker: 'VA Premier'
    },
    {
      broker: 'NMN'
    },
    {
      broker: 'MAS'
    },
    {
      broker: 'Verida'
    },
    {
      broker: 'Private Pay'
    },
    {
      broker: 'Medicaid'
    },
    {
      broker: 'Epic'
    },
    {
      broker: 'Amera'
    },
    {
      broker: 'OneCall'
    },
    {
      broker: 'Veyo'
    },
    {
      broker: 'LCP'
    },
    {
      broker: 'Medex'
    },
    {
      broker: 'ARN'
    },
    {
      broker: 'Call the Car'
    },
    {
      broker: 'Modivcare'
    },
    {
      broker: 'WellTrans'
    },
    {
      broker: 'Tennessee Carriers'
    },
    {
      broker: 'SafeRide'
    },
    {
      broker: 'Ride2MD'
    },
    {
      broker: 'IEHP'
    },
    {
      broker: 'CalOptima'
    },
  ]
onBrokerSelected(bro: any){
  this.selectedBroker = bro;
  this.selectbrokerData.emit(this.selectedBroker)
}

}
