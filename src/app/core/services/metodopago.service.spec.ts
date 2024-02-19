import { TestBed } from '@angular/core/testing';

import { MetodopagoService } from './metodopago.service';

describe('MetodopagoService', () => {
  let service: MetodopagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodopagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
