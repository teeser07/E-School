import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastr: ToastrService,
  ) { }

  success(message) {
    this.toastr.success(message)
  }
  warning(message) {
    this.toastr.warning(message)
  }
  info(message) {
    this.toastr.info(message)
  }
  error(message) {
    this.toastr.error(message)
  }
}
