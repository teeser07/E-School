import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeacherhomeService } from 'src/app/page/teacherhome/teacherhome.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';

@Component({
  selector: 'app-homeworkdetails',
  templateUrl: './homeworkdetails.component.html',
  styleUrls: ['./homeworkdetails.component.scss']
})
export class HomeworkdetailsComponent implements OnInit {
  HomeworkId : any
  homeworkDetailList :any[]=[];
  Title : any ={};
  addForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private TC : TeacherhomeService,
    private fb: FormBuilder,
    private fu: FormUtilService,
  ) {
    this.HomeworkId = this.activatedRoute.snapshot.paramMap.get('homeWorkId')
    
   }

  ngOnInit(): void {
    this.getListHw()
    this.getTitle()
    this.addForm = this.fb.group({
      Answer: [null, [Validators.required, Validators.maxLength(50)]],
      subjectId: null
    });
  }

  getTitle(){
    this.TC.getTitle(this.HomeworkId).subscribe((res)=>{
      this.Title = res
    })
  }

  getListHw(){
    this.TC.getHomeworkList(this.HomeworkId).subscribe((res:any)=>{
      this.homeworkDetailList = res.homeworkDetailList
      console.log(this.homeworkDetailList)
    })
  }

}
