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
  EmpList :any;

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
    });
    this.getEmp()
   }

 ngOnInit(): void {
    console.log(this.hideBack)
  }

  back() {
    this.location.back();
  }

  getEmp(){
    this.classroomService.getEmp(this.key).subscribe(res => {
      this.EmpList = res;
      console.log(this.EmpList)
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
