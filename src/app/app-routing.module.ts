import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerformComponent } from './Components/brokerform/brokerform.component';
import { BrokerdispComponent } from './Components/brokerdisp/brokerdisp.component';

const routes: Routes = [
  {
    path : "",
    component: BrokerformComponent
  },
  {
    path : "brokerform",
    component: BrokerformComponent
  },
  {
    path : "brokerdisp",
    component: BrokerdispComponent
  },
  { path: 'brokerform/edit/:id', 
    component: BrokerformComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
