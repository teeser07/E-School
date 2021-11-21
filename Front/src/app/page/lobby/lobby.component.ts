import { Component, OnInit } from '@angular/core';
import { LobbyService } from './lobby.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { StudenthomeService } from '../studenthome/studenthome.service';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  homeworkDoneList : FormArray;
  user : any = 2;
  constructor(
    private http: LobbyService,
    private SS : StudenthomeService,
    private ms : MessageService,
    private fb : FormBuilder
    ) { }

  ngOnInit(): void {
    this.homeworkDoneList = new FormArray([
      new FormGroup({
        mapClassRoomTeacherId : new FormControl(47),
        studentId : new FormControl(67),
        homeworkDetailId : new FormControl(4),
        status : new FormControl('off'),
        answer : new FormControl('')
      })
    ])
  }

  onSubmit() {
    //this.homeworkDoneList.patchValue([]);
    console.log(this.homeworkDoneList.value);  // ['SF', 'NY']
    //console.log(this.form.value);    // { cities: ['SF', 'NY'] }
    this.SS.saveHomework(this.homeworkDoneList.value).subscribe(()=>{
      this.ms.success('success')
    })
  }


  click() {
    this.http.getUser().subscribe(res => {
      console.log(res)
    })
  }

}
