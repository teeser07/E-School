import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherhomeService {

  constructor(private http: HttpClient) { }

  getTeacher(Emp_code?) {
    if (!Emp_code) Emp_code = null
    return this.http.get('EmpProfile', { params: { Emp_code: Emp_code } });
  }

  getRoom(MapClassRoomTeacherId?) {
    if (!MapClassRoomTeacherId) MapClassRoomTeacherId = 0
    return this.http.get('MapClassRoomTeacher/get-detail', { params: { MapClassRoomTeacherId: MapClassRoomTeacherId } });
  }

  getSubjects(SubjectTeacherId?){
    if(!SubjectTeacherId) SubjectTeacherId = 0
    return this.http.get('Subject/get-subject-detail', {params:{SubjectTeacherId:SubjectTeacherId}});
  }
  getTimetable(DayValue?,SubjectId?){
    if (!DayValue) DayValue = null
    else if (!SubjectId) SubjectId = 0
    return this.http.get('TimeTable/timetableteacher',{params: { DayValue: DayValue ,SubjectId:SubjectId}})
  }

  getSubject(SubjectTeacherId?){
    if(!SubjectTeacherId)SubjectTeacherId = 0
    return this.http.get('Subject/get-subject-detail',{params:{SubjectTeacherId:SubjectTeacherId}})
  }

  getClass(SubjectId?){
    return this.http.get('MapClassRoomTeacher/Room',{ params: { SubjectId: SubjectId } });
  }

  getHomeworks(EmpProfileId?,MapClassRoomTeacherId?){
    return this.http.get('Homework/get-hw-teacher',{params:{EmpProfileId:EmpProfileId,MapClassRoomTeacherId:MapClassRoomTeacherId}})
  }

  save(value) {
    if (value.homeWorkId)
      return this.http.put('Homework/update-hw', value);
    else
      return this.http.post('Homework/save-homework',value);
  }

  deleteHomework(homeWorkId){
    return this.http.delete('Homework/delete-hw',{ params: { homeWorkId: homeWorkId } });
  }

  getHomeworkList(HomeworkId?){
    return this.http.get('HomeworkDetail/get-hw-detail',{ params: { HomeworkId: HomeworkId } })
  }

  saves(value){
    if (value.homeWorkDetailId)
      return this.http.put('HomeworkDetail/update-hw-detail', value);
    else
      return this.http.post('HomeworkDetail/save-homework-detail',value);
  }

  deleteHomeworkDetail(HomeWorkDetailId){
    return this.http.delete('HomeworkDetail/delete-hw-detail',{ params: { HomeWorkDetailId: HomeWorkDetailId } });
  }

  getTitle(HomeWorkId?){
    return this.http.get('Homework/get-hw-title',{ params: { HomeWorkId: HomeWorkId } })
  }
}
