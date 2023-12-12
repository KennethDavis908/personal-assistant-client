import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ToDoListService } from './to-do-list.service';
import { ToastService } from './toast.service';
import { ToDoList } from '../models/to-do-list';
import { environment } from 'src/environments/environment';

describe('ToDoListService', () => {
  let service: ToDoListService;
  let httpMock: HttpTestingController
  let toastService: jasmine.SpyObj<ToastService>

  const mockToDoList = new ToDoList(1, new Date(), []);

  beforeEach(() => {
    toastService = jasmine.createSpyObj('ToastService', [
      'error',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: ToastService, useValue: toastService}],
    });

    service = TestBed.inject(ToDoListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give to do list by date', (done: DoneFn) => {
    service.getByDate(new Date()).subscribe((toDoList: ToDoList) => {
      expect(toDoList).toEqual(mockToDoList);
      done()
    })

    const httpRequest = httpMock.expectOne(`${environment.personalAssistantApi.toDoList.getByDate}/${new Date().toISOString().split('T')[0]}`)
    httpRequest.flush(mockToDoList)
  })

  it('should toast an error when failing to retrieve to do list by date', (done: DoneFn) => {
    service.getByDate(new Date()).subscribe(
      {
        error: () => {
          expect(toastService.error).toHaveBeenCalledTimes(1);
          done()
        }
      }
    )

    const httpRequest = httpMock.expectOne(`${environment.personalAssistantApi.toDoList.getByDate}/${new Date().toISOString().split('T')[0]}`)
    httpRequest.error(new ProgressEvent('Unexpected Error'));
  })
});
