import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { StudenthomeService } from '../studenthome.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  User : any;
  Profile :any = [];
  Room :any = [];
  row : any[];
  Subject: any[]
  Document : any = 0;
  DocumentStudentList : any[] = [];
  constructor(
    private as : AuthService,
    private SS : StudenthomeService
  ) { }

  ngOnInit(): void {
    this.getSubjectList()
  }

 

  getSubjectList(){
    this.as.user 
    this.User = this.as.user 

    this.SS.getStudent(this.User.studentCode).subscribe((res)=>{
      this.Profile = res

    this.SS.getRoom(this.Profile.map_class_room_teacher_id).subscribe((res)=>{
        this.Room = res

    this.SS.getSubjectList(this.Profile.map_class_room_teacher_id).subscribe((res:any)=>{
      this.Subject = res.subjectList
      })
    })
  })
  }

  getDocument(){
    this.SS.getStudentDocument(this.Document).subscribe((res:any)=>{
      this.DocumentStudentList = res.documentList
      this.row = res.documentList
      })
  }

  dowLoadFIle(pdf,name){
    const linkSource = pdf;
    const downloadLink = document.createElement("a");
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
