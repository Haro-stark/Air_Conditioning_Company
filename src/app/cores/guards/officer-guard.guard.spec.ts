import { TestBed } from '@angular/core/testing';

import { OfficerGuardGuard } from './officer-guard.guard';

describe('OfficerGuardGuard', () => {
  let guard: OfficerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OfficerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
