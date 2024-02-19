import { TestBed } from '@angular/core/testing';

import { LugarService } from './lugar.service';

describe('LugarService', () => {
  let service: LugarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LugarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
