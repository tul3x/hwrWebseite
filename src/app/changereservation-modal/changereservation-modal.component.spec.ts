import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangereservationModalComponent } from './changereservation-modal.component';

describe('ChangereservationModalComponent', () => {
  let component: ChangereservationModalComponent;
  let fixture: ComponentFixture<ChangereservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangereservationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangereservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
