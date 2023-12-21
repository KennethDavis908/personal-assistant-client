import { TestBed, tick } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastService } from './toast.service';
import { Task } from '../models/task';
import { environment } from 'src/environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController
  let toastService: jasmine.SpyObj<ToastService>

  const mockUpsertedTask = new Task(1, 'test task', false, 1);

  beforeEach(() => {
    toastService = jasmine.createSpyObj('ToastService', [
      'error',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: ToastService, useValue: toastService}],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give upserted task', (done: DoneFn) => {
    service.upsertTask(new Task(0, 'test task', false, 1)).subscribe((task: Task) => {
      expect(task).toEqual(mockUpsertedTask);
      done()
    })

    const httpRequest = httpMock.expectOne(`${environment.personalAssistantApi.task.upsert}`)
    httpRequest.flush(mockUpsertedTask)
  })

  it('should toast an error when failing to upsert task', (done: DoneFn) => {
    service.upsertTask(new Task(0, 'test task', false, 1)).subscribe(
      {
        error: () => {
          expect(toastService.error).toHaveBeenCalledTimes(1);
          done()
        }
      }
    )

    const httpRequest = httpMock.expectOne(`${environment.personalAssistantApi.task.upsert}`)
    httpRequest.error(new ProgressEvent('Unexpected Error'));
  })
});
