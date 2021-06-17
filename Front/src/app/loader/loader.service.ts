import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading = new Subject<boolean>();
  isLoading$ = this.isLoading.asObservable().pipe(delay(100));
  loadingStack = [] as boolean[];

  constructor() { }

  start() {
    this.loadingStack.push(true);
    this.isLoading.next(true);
  }

  stop() {
    if (this.loadingStack.length > 0) {
      this.loadingStack.pop();
      if (this.loadingStack.length === 0)
        this.isLoading.next(false);
    }
  }

  forceStop() {
    this.loadingStack = [];
    this.isLoading.next(false);
  }
}
