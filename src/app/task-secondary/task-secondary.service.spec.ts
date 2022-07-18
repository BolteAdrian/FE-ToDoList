import { TestBed } from '@angular/core/testing';
import { TaskSecondaryService } from './task-secondary.service';

describe('TaskSecondaryService', () => {
  let service: TaskSecondaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSecondaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
