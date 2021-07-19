import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationService } from '../../theme/services/navigation.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() hideBack: boolean;

  constructor(
    public navService: NavigationService,
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log(this.hideBack)
  }

  back() {
    this.location.back();
  }

}
