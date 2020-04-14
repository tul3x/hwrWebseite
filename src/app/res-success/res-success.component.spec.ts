import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResSuccessComponent } from './res-success.component';

describe('ResSuccessComponent', () => {
  let component: ResSuccessComponent;
  let fixture: ComponentFixture<ResSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
