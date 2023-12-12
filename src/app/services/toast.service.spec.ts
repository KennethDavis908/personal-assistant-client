import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { ToastrService } from 'ngx-toastr';

describe('ToastService', () => {
  let service: ToastService;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', [
      'error',
      'success',
      'info',
      'warning',
    ])

    TestBed.configureTestingModule({
      providers: [{ provide: ToastrService, useValue: toastrService }],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //success method
  it('should call toastr success with input message', () => {
    service.success('message');
    expect(toastrService.success).toHaveBeenCalledWith(
      'message',
      undefined,
      {}
    );
  });

  it('should call toastr success with input message and title', () => {
    service.success('message', 'title');
    expect(toastrService.success).toHaveBeenCalledWith('message', 'title', {});
  });

  //successUntilAcknowledge method
  it('should call toastr success with input message with configuration to remain until acknowledged', () => {
    service.successUntilAcknowledge('message');
    expect(toastrService.success).toHaveBeenCalledWith('message', undefined, {
      closeButton: true,
      disableTimeOut: true,
    });
  });

  it('should call toastr success with input message and title with configuration to remain until acknowledged', () => {
    service.successUntilAcknowledge('message', 'title');
    expect(toastrService.success).toHaveBeenCalledWith('message', 'title', {
      closeButton: true,
      disableTimeOut: true,
    });
  });

  //warning method
  it('should call toastr warning with input message and timeOut configureation', () => {
    service.warning('message');
    expect(toastrService.warning).toHaveBeenCalledWith('message', undefined, {
      timeOut: 5000,
    });
  });

  it('should call toastr warning with input message and title and timeOut configureation', () => {
    service.warning('message', 'title');
    expect(toastrService.warning).toHaveBeenCalledWith('message', 'title', {
      timeOut: 5000,
    });
  });

  //error method
  it('should call toastr error with input message', () => {
    service.error('message');
    expect(toastrService.error).toHaveBeenCalledWith('message', undefined, {
      timeOut: 5000,
    });
  });

  it('should call toastr error with input message and title', () => {
    service.error('message', 'title');
    expect(toastrService.error).toHaveBeenCalledWith('message', 'title', {
      timeOut: 5000,
    });
  });

  //errorUntilAcknowledge method
  it('should call toastr error with input message with configuration to remain until acknowledged', () => {
    service.errorUntilAcknowledge('message');
    expect(toastrService.error).toHaveBeenCalledWith('message', undefined, {
      closeButton: true,
      disableTimeOut: true,
    });
  });

  it('should call toastr error with input message and title with configuration to remain until acknowledged', () => {
    service.errorUntilAcknowledge('message', 'title');
    expect(toastrService.error).toHaveBeenCalledWith('message', 'title', {
      closeButton: true,
      disableTimeOut: true,
    });
  });

  //info method
  it('should call toastr info with input message', () => {
    service.info('message');
    expect(toastrService.info).toHaveBeenCalledWith('message', undefined, {});
  });

  it('should call toastr info with input message and title', () => {
    service.info('message', 'title');
    expect(toastrService.info).toHaveBeenCalledWith('message', 'title', {});
  });
});
