import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder } from '@angular/forms';
import { ClassroomService } from './classroom.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  addRoomForm : FormGroup ;


  constructor(
    private classroomService : ClassroomService,
    private modalService: NgbModal,
    private FormBuilder: FormBuilder
   ) { 
    this.addRoomForm = this.FormBuilder.group([
      
    ])

    
  }

  ngOnInit() {
    this.classroomService.getRoom()
    .subscribe((res: any[]) => {
      this.products = [...res];
      this.filteredProducts = res;
    });

    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filerData(value);
    });
  }
  
  filerData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.filteredProducts = [...this.products];
    }

    const columns = Object.keys(this.products[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.products.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredProducts = rows;
  }
  
  confirm(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'})
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  addRoom() {
    this.classroomService.addRoom
  }
}
