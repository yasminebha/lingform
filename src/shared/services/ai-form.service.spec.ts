import { TestBed } from '@angular/core/testing';

import { AiFormService } from './ai-form.service';

describe('AiFormService', () => {
  let service: AiFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
