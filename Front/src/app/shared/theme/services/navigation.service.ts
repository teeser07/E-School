import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    selectedItem: IMenuItem;
    
    constructor() {
    }

    defaultMenu: IMenuItem[] = [
        {
            name: 'ข้อมูลโรงเรียน',
            type: 'dropDown',
            icon: 'i-University',
            sub: [
                {   
                    name: 'ชั้นเรียนและห้องเรียน',
                    type: 'link',
                    icon: 'i-Door',
                    state: 'page/classroom',
                },
                {   
                    name: 'บุคลากร',
                    type: 'link',
                    icon: 'i-Administrator',
                    state: 'page/emp',
                },
                {   
                    name: 'นักเรียน',
                    type: 'link',
                    icon: 'i-Administrator',
                    state: 'page/std',
                },
            ]
        },
        {
            name: 'ตารางสอน',
            type: 'dropDown',
            icon: 'i-Calendar',
            sub: [
                {   
                    name: 'รายวิชา',
                    type: 'link',
                    icon: 'i-Receipt-3',
                    state: 'page/subject'
                },
                {   
                    name: 'ช่วงเวลาการเรียน',
                    type: 'link',
                    icon: 'i-Clock',
                },
                {   
                    name: 'วัน',
                    type: 'link',
                    icon: 'i-Calendar-4',
                },
                {   
                    name: 'จัดตารางเรียน',
                    type: 'link',
                    icon: 'i-Add',
                },
            ]
        },
        
    ];


    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    // You can customize this method to supply different menu for
    // different user type.
    // publishNavigationChange(menuType: string) {
    //   switch (userType) {
    //     case 'admin':
    //       this.menuItems.next(this.adminMenu);
    //       break;
    //     case 'user':
    //       this.menuItems.next(this.userMenu);
    //       break;
    //     default:
    //       this.menuItems.next(this.defaultMenu);
    //   }
    // }
}
