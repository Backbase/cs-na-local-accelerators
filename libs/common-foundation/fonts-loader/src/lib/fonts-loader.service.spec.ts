import { TestBed } from '@angular/core/testing';

import { FontsLoaderService } from './fonts-loader.service';

describe('FontsLoaderService', () => {
  let service: FontsLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
