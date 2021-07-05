import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient
    ) { }

  getSubject(){
    return this.http.get('Subject/get-subject');
  }
}
