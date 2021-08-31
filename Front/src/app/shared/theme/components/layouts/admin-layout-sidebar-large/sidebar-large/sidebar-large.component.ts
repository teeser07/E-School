import { Component, OnInit, HostListener, ViewChildren, QueryList } from '@angular/core';
import {
  NavigationService,
  IMenuItem,
  IChildItem
} from '../../../../services/navigation.service';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { filter } from 'rxjs/operators';
import { Utils } from '../../../../utils';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-sidebar-large',
  templateUrl: './sidebar-large.component.html',
  styleUrls: ['./sidebar-large.component.scss']
})
export class SidebarLargeComponent implements OnInit {
  User : any
  selectedItem: IMenuItem;
  nav: IMenuItem[];
  @ViewChildren(PerfectScrollbarDirective) psContainers:QueryList<PerfectScrollbarDirective>;
  psContainerSecSidebar: PerfectScrollbarDirective;

  constructor(public router: Router, public navService: NavigationService,private as : AuthService,) {
    setTimeout(() => {
      this.psContainerSecSidebar = this.psContainers.toArray()[1];
    });
  }

  ngOnInit() {
    this.getUser()
    
    this.updateSidebar();
    // CLOSE SIDENAV ON ROUTE CHANGE
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(routeChange => {
        this.closeChildNav();
        if (Utils.isMobile()) {
          this.navService.sidebarState.sidenavOpen = false;
        }
      });
    this.selectMenu()
  }

  selectItem(item) {
    this.navService.sidebarState.childnavOpen = true;
    this.navService.selectedItem = item;
    this.setActiveMainItem(item);

    // Scroll to top secondary sidebar
    setTimeout(() => {            
      this.psContainerSecSidebar.update();
      this.psContainerSecSidebar.scrollToTop(0, 400);
    });
  }
  closeChildNav() {
    this.navService.sidebarState.childnavOpen = false;
    this.setActiveFlag();
  }

  onClickChangeActiveFlag(item) {
    this.setActiveMainItem(item);
  }
  setActiveMainItem(item) {
    this.nav.forEach(i => {
      i.active = false;
    });
    item.active = true;
  }

  setActiveFlag() {
    if (window && window.location) {
      const activeRoute = window.location.hash || window.location.pathname;
      this.nav.forEach(item => {
        item.active = false;
        if (activeRoute.indexOf(item.state) !== -1) {
          this.navService.selectedItem = item;
          item.active = true;
        }
        if (item.sub) {
          item.sub.forEach(subItem => {
            subItem.active = false;
            if (activeRoute.indexOf(subItem.state) !== -1) {
              this.navService.selectedItem = item;
              item.active = true;
            }
            if (subItem.sub) {
              subItem.sub.forEach(subChildItem => {
                if (activeRoute.indexOf(subChildItem.state) !== -1) {
                  this.navService.selectedItem = item;
                  item.active = true;
                  subItem.active = true;
                }
              });
            }
          });
        }
      });
    }
  }

  updateSidebar() {
    if (Utils.isMobile()) {
      this.navService.sidebarState.sidenavOpen = false;
      this.navService.sidebarState.childnavOpen = false;
    } else {
      this.navService.sidebarState.sidenavOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSidebar();
  }

  getUser(){
    this.as.user
    this.User = this.as.user.role
    console.log(this.User)
  }
  selectMenu(){
    if(this.User == "A"){
      this.navService.menuItems$.subscribe(items => {
        this.nav = items;
        this.setActiveFlag();
      });
      console.log("Admin")
    }
    else if(this.User == "T"){
      this.navService.menuItems2$.subscribe(items => {
        this.nav = items;
        this.setActiveFlag();
      });
      console.log("Teacher")
    }
    else if(this.User == "S"){
      this.navService.menuItems3$.subscribe(items => {
        this.nav = items;
        this.setActiveFlag();
      });
      console.log("Student")
    }
    }
      
}
