import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherhomeService } from 'src/app/page/teacherhome/teacherhome.service';

@Component({
  selector: 'app-homework-list',
  templateUrl: './homework-list.component.html',
  styleUrls: ['./homework-list.component.scss']
})
export class HomeworkListComponent implements OnInit {
  TeacherId :any
  RoomId : any
  homeworkList : any[] = []
  constructor(
    private activatedRoute: ActivatedRoute,
    private TC : TeacherhomeService,
  ) { 
    this.TeacherId = this.activatedRoute.snapshot.paramMap.get('empProfileId');
    this.RoomId = this.activatedRoute.snapshot.paramMap.get('mapClassRoomTeacherId')
  }

  ngOnInit(): void {
    this.getHomework()
  }

  getHomework(){
    this.TC.getHomeworks(this.TeacherId,this.RoomId).subscribe((res:any)=>{
      this.homeworkList = res.homeworkList
      console.log(this.homeworkList)
    })
  }


  
}
