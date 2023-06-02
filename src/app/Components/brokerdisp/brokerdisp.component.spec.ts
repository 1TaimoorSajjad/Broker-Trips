import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerdispComponent } from './brokerdisp.component';

describe('BrokerdispComponent', () => {
  let component: BrokerdispComponent;
  let fixture: ComponentFixture<BrokerdispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerdispComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerdispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
