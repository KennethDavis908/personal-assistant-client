import { Injectable } from '@angular/core';

import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private configOptions: Partial<IndividualConfig> = {};

  constructor(private toastr: ToastrService) {}

  public success(message: string, title?: string): void {
    this.toastr.success(message, title, this.configOptions);
  }

  public successUntilAcknowledge(message: string, title?: string): void {
    this.toastr.success(message, title, {
      closeButton: true,
      disableTimeOut: true,
      ...this.configOptions,
    });
  }

  public warning(message: string, title?: string): void {
    this.toastr.warning(message, title, {
      timeOut: 5000,
      ...this.configOptions,
    });
  }

  public error(message: string, title?: string): void {
    this.toastr.error(message, title, { ...this.configOptions, timeOut: 5000  });
  }

  public errorUntilAcknowledge(message: string, title?: string): void {
    this.toastr.error(message, title, {
      closeButton: true,
      disableTimeOut: true,
      ...this.configOptions,
    });
  }

  public info(message: string, title?: string): void {
    this.toastr.info(message, title, this.configOptions);
  }
}
