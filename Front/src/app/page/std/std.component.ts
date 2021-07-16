import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/theme/services/product.service';
import { StdService } from './std.service';
@Component({
  selector: 'app-std',
  templateUrl: './std.component.html',
  styleUrls: ['./std.component.scss']
})
export class StdComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private stdService : StdService,
  ) { }

  ngOnInit() {
    this.productService.getProducts()
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


}
