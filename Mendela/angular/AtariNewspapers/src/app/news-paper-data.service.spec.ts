import { TestBed } from '@angular/core/testing';

import { NewsPaperDataService } from './news-paper-data.service';

describe('NewsPaperDataService', () => {
  let service: NewsPaperDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsPaperDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
