import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {


  constructor(private http: HttpClient
    ) { }

  getSubject(keyword){
    return this.http.get('Subject/get-subject',{ params: { keyword: keyword } });
  }

  deleteSubject(subjectId){
    return this.http.delete('Subject/delete-subject',{ params: { subjectId: subjectId } });
  }

  save(value) {
    if (value.subjectId)
      return this.http.put('Subject/update-subject', value);
    else
      return this.http.post('Subject/save-subject', value);
  }

  getEmp(key) {
    return this.http.get('Subject/get-emp', { params: { key: key } });
  }

  


}
