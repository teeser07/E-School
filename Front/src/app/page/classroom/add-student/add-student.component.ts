import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../classroom.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  studentList: any[] = [];
  selected = [];

  constructor(private classroomService: ClassroomService,
    private location: Location,
    private message: MessageService,) { }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent() {
    this.classroomService.getStudent().subscribe((val: any) => {
      this.studentList = val.studentList;
    });
  }

  save() {
    let data = this.selected.map(m => m.studentProfileId);
    console.log(this.selected)
    console.log(data)
    this.classroomService.saveStudent(data, history.state.mapclassroomteacherId).subscribe(() => {
      //this.getStudent();
      this.message.success('เพิ่มข้อมูลนักเรียนสำเร็จ');
      this.location.back();
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    console.log(this.selected.splice(0, this.selected.length))
    this.selected.push(...selected);
    console.log(this.selected.push(...selected))
  }

}
