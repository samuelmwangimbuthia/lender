import { TestBed } from '@angular/core/testing';

import { OnboardLenderService } from './onboard-lender.service';

describe('OnboardLenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnboardLenderService = TestBed.get(OnboardLenderService);
    expect(service).toBeTruthy();
  });
});
