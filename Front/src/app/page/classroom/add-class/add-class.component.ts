import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationService } from 'src/app/shared/theme/services/navigation.service';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { ClassroomService } from '../classroom.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import { MessageService } from 'src/app/core/message.service';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  addForm: FormGroup;
  key : string = 'T';
  EmpList1 :any[] =[];
  EmpList2 :any[] =[];
  @Input() hideBack: boolean;
  constructor(
    private router : Router,
    private fb: FormBuilder,
    private classroomService : ClassroomService,
    public navService: NavigationService,
    private location: Location,
    private fu: FormUtilService,
    private message: MessageService
  ) {
    this.addForm = this.fb.group({
      educationLevel: [null, [Validators.required, Validators.maxLength(50)]],
      class: [null, [Validators.required, Validators.maxLength(10)]],
      room: [null, [Validators.required, Validators.maxLength(10)]],
      empProfileIdFirst:[null, [Validators.required, Validators.maxLength(10)]],
      empProfileIdSecond: [null],
      mapClassRoomTeacherName: [null, [Validators.required, Validators.maxLength(50)]],
      mapclassroomteacherId : null,
    });
    if (history.state){
      this.addForm.patchValue(history.state,{emitEvent: false });
    }
    this.addForm.controls.empProfileIdSecond.disable()
    this.addForm.controls.empProfileIdFirst.valueChanges.subscribe(value=>{
      if(value){
        this.addForm.controls.empProfileIdSecond.enable()
      }
      this.EmpList2 = this.EmpList1
      this.EmpList2 = this.EmpList2.filter(emp => emp.empProfileId != value)
      console.log(this.EmpList2)
    })
    this.getEmp()
   }

 ngOnInit(): void {
    console.log(history.state)
    console.log(this.hideBack)
  }

  back() {
    this.location.back();
  }

  getEmp(){
    this.classroomService.getEmp(this.key).subscribe((res :any[]) => {
      this.EmpList1 = res;
      this.EmpList2 = res;
    })
  }

  save() {
    if (this.addForm.invalid) {
      this.fu.markFormGroupTouched(this.addForm);
      return;
    }
    this.classroomService.save(this.addForm.value).subscribe(() => {
      this.router.navigateByUrl('/page/classroom')
      this.message.success('บันทึกข้อมูลสำเร็จ');
    });
  }

}
