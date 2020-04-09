import { TestBed } from '@angular/core/testing';

import { EditreservationService } from './editreservation.service';

describe('EditreservationService', () => {
  let service: EditreservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditreservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
