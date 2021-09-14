import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../timetable/timetable.service';

@Component({
  selector: 'app-online-class',
  templateUrl: './online-class.component.html',
  styleUrls: ['./online-class.component.scss']
})
export class OnlineClassComponent implements OnInit {
  row: any[];
  keyword: string = '';
  ClassList :any[] =[];
  constructor(
    private timeTableService : TimetableService,
  ) { }

  ngOnInit(): void {
    this.getClass()
  }

  getClass(){
    this.timeTableService.getClass(this.keyword).subscribe((res :any[]) => {
      this.ClassList = res;
      this.row = res;
      console.log(this.row)
    })
  }
}
