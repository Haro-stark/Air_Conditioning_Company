import { TestBed } from '@angular/core/testing';

import { ShareDatabetweenComponentsService } from './share-databetween-components.service';

describe('ShareDatabetweenComponentsService', () => {
  let service: ShareDatabetweenComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDatabetweenComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
