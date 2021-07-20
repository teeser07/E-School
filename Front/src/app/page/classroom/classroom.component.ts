import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { ClassroomService } from './classroom.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/core/message.service';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  confirmResut;
  roomForm : FormGroup ;
  row:any[];
  loading: boolean;
  @ViewChild('modalDelete', { static: true }) modalDelete;
  @ViewChild('modalUpdate', { static: true }) modalUpdate;
  detail ;
  detail1 ;


  constructor(
    private classroomService : ClassroomService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private toastr : ToastrService,
   ) { }

  ngOnInit() {

  }
}
  
  