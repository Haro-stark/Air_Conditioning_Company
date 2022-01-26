import { TestBed } from '@angular/core/testing';

import { AssistantGuardGuard } from './assistant-guard.guard';

describe('AssistantGuardGuard', () => {
  let guard: AssistantGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AssistantGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
