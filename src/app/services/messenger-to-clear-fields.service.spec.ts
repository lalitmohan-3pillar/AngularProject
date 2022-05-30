import { TestBed } from '@angular/core/testing';

import { MessengerToClearFieldsService } from './messenger-to-clear-fields.service';

describe('MessengerToClearFieldsService', () => {
  let service: MessengerToClearFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerToClearFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
