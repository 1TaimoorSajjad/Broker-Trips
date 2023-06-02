import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerformComponent } from './brokerform.component';

describe('BrokerformComponent', () => {
  let component: BrokerformComponent;
  let fixture: ComponentFixture<BrokerformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
