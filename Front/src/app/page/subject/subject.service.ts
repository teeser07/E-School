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

  deleteSubject(id:any){
    return this.http.delete(`Subject/delete-subject?subject_id=${id}`)
  }

  saveSubject(data:any){
    return this.http.post('Subject/save-subject',data)
  }

  getSubjectDetail(id:any){
    return this.http.get(`Subject/get-subject-detail?subject_id=${id}`)
  }

  updateSubject(id:any,data:any){
    return this.http.put(`Subject/update-subject?subject_id=${id}`,data)
  }


}
