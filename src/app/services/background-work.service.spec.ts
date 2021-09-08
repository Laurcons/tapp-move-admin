import { TestBed } from '@angular/core/testing';

import { BackgroundWorkService } from './background-work.service';

describe('BackgroundWorkService', () => {
  let service: BackgroundWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
