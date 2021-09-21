import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';

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
    userType :any
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    
    
    constructor(
        private as : AuthService,
        private router: Router,
    ) {}
    
    
    selectedItem: IMenuItem;
    
    
    defaultMenu: IMenuItem[] = [
        {
            name: 'Demo',
            type: 'dropDown',
            icon: 'i-Code-Window',
            sub: [
                {   
                    name: 'Dashboard',
                    type: 'dropDown',
                    icon: 'i-Bar-Chart',
                    sub: [
                        { icon: 'i-Clock-3', name: 'Version 1', state: '/demo/dashboard/v1', type: 'link' },
                        { icon: 'i-Clock-4', name: 'Version 2', state: '/demo/dashboard/v2', type: 'link' },
                        { icon: 'i-Over-Time', name: 'Version 3', state: '/demo/dashboard/v3', type: 'link' },
                        { icon: 'i-Clock', name: 'Version 4', state: '/demo/dashboard/v4', type: 'link' },
                    ]
                },
                {
                    name: 'UI kits',
                    type: 'dropDown',
                    icon: 'i-Library',
                    sub: [
                        { icon: 'i-Bell', name: 'Alerts', state: '/demo/uikits/alerts', type: 'link' },
                        { icon: 'i-Split-Horizontal-2-Window', name: 'Accordions', state: '/demo/uikits/accordions', type: 'link' },
                        { icon: 'i-Medal-2', name: 'Badges', state: '/demo/uikits/badges', type: 'link' },
                        {
                            icon: 'i-Arrow-Right-in-Circle',
                            name: 'Buttons',
                            type: 'dropDown',
                            sub: [
                                { name: 'Bootstrap Buttons', state: '/demo/uikits/buttons', type: 'link' },
                                { name: 'Loding Buttons', state: '/demo/uikits/buttons-loading', type: 'link' }
                            ]
                        },
                        { icon: 'i-ID-Card', name: 'Cards', state: '/demo/uikits/cards', type: 'link' },
                        { icon: 'i-Line-Chart-2', name: 'Cards metrics', state: '/demo/uikits/cards-metrics', type: 'link' },
                        { icon: 'i-Credit-Card', name: 'Cards widget', state: '/demo/uikits/cards-widget', type: 'link' },
                        { icon: 'i-Full-Cart', name: 'Cards ecommerce', state: '/demo/uikits/cards-ecommerce', type: 'link' },
                        { icon: 'i-Duplicate-Window', name: 'Modals', state: '/demo/uikits/modals', type: 'link' },
                        { icon: 'i-Speach-Bubble-3', name: 'Popover', state: '/demo/uikits/popover', type: 'link' },
                        { icon: 'i-Like', name: 'Rating', state: '/demo/uikits/rating', type: 'link' },
                        { icon: 'i-Loading-3', name: 'Loaders', state: '/demo/uikits/loaders', type: 'link' },
                    ]
                },
                {
                    name: 'Apps',
                    type: 'dropDown',
                    icon: 'i-Computer-Secure',
                    sub: [
                        { icon: 'i-Add-File', name: 'Invoice Builder', state: '/demo/invoice', type: 'link' },
                        { icon: 'i-Email', name: 'Inbox', state: '/demo/inbox', type: 'link' },
                        { icon: 'i-Speach-Bubble-3', name: 'Chat', state: '/demo/chat', type: 'link' },
                        { icon: 'i-Calendar', name: 'Calendar', state: '/demo/calendar', type: 'link' },
                    ]
                },
                {
                    name: 'Forms',
                    type: 'dropDown',
                    icon: 'i-File-Clipboard-File--Text',
                    sub: [
                        { icon: 'i-File-Clipboard-Text--Image', name: 'Basic components', state: '/demo/forms/basic', type: 'link' },
                        { icon: 'i-Split-Vertical', name: 'Form layouts', state: '/demo/forms/layouts', type: 'link' },
                        { icon: 'i-Receipt-4', name: 'Input Group', state: '/demo/forms/input-group', type: 'link' },
                        { icon: 'i-File-Edit', name: 'Input Mask', state: '/demo/forms/input-mask', type: 'link' },
                        { icon: 'i-Tag-2', name: 'Tag Input', state: '/demo/forms/tag-input', type: 'link' },
                        { icon: 'i-Width-Window', name: 'Wizard', state: '/demo/forms/wizard', type: 'link' },
                        { icon: 'i-Crop-2', name: 'Image Cropper', state: '/demo/forms/img-cropper', type: 'link' },
                    ]
                },
                {
                    name: 'Data Tables',
                    type: 'dropDown',
                    icon: 'i-File-Horizontal-Text',
                    sub: [
                        { icon: 'i-File-Horizontal-Text', name: 'List', state: '/demo/tables/list', type: 'link' },
                        { icon: 'i-Full-View-Window', name: 'Fullscreen', state: '/demo/tables/full', type: 'link' },
                        { icon: 'i-Code-Window', name: 'Paging', state: '/demo/tables/paging', type: 'link' },
                        { icon: 'i-Filter-2', name: 'Filter', state: '/demo/tables/filter', type: 'link' },
                    ]
                },
                {
                    name: 'Pages',
                    type: 'dropDown',
                    icon: 'i-Windows-2',
                    sub: [
                        { icon: 'i-Male', name: 'User Profile', state: '/demo/pages/profile', type: 'link' }
                    ]
                },
                {
                    name: 'Icons',
                    type: 'link',
                    icon: 'i-Cloud-Sun',
                    state: '/demo/icons/iconsmind'
                },
                {
                    name: 'Others',
                    type: 'dropDown',
                    icon: 'i-Double-Tap',
                    sub: [
                        { icon: 'i-Error-404-Window', name: 'Not found', state: '/others/404', type: 'link' }
                    ]
                },
                {
                    name: 'Doc',
                    type: 'extLink',
                    icon: 'i-Safe-Box1',
                    state: 'http://demos.ui-lib.com/gull-doc'
                },
                {
                    name: 'Custom Demo',
                    type: 'dropDown',
                    icon: 'i-Code-Window',
                    sub: [
                        { icon: 'i-Code-Window', name: 'Tool Bar', state: '/page/custom-demo/toolbar', type: 'link' }
                    ]
                }
            ]
        },
        {
            name: 'ข้อมูลรายชื่อ',
            type: 'dropDown',
            icon: 'i-University',
            sub: [
                {   
                    name: 'กำหนดบุคลากร',
                    type: 'link',
                    icon: 'i-Administrator',
                    state: 'page/emp',
                },
                {   
                    name: 'กำหนดนักเรียน',
                    type: 'link',
                    icon: 'i-Administrator',
                    state: 'page/std',
                },
                {   
                    name: 'กำหนดชั้นเรียนและห้องเรียน',
                    type: 'link',
                    icon: 'i-Door',
                    state: 'page/classroom',
                },
            ]
        },
        {
            name: 'ตารางสอน',
            type: 'dropDown',
            icon: 'i-Calendar',
            sub: [
                {   
                    name: 'กำหนดรายวิชา',
                    type: 'link',
                    icon: 'i-Receipt-3',
                    state: 'page/subject'
                },
                {   
                    name: 'กำหนดคาบเรียน',
                    type: 'link',
                    icon: 'i-Clock',
                    state: 'page/period'
                },
                {   
                    name: 'กำหนดวันหยุด',
                    type: 'link',
                    icon: 'i-Calendar-4',
                    state: 'page/holiday'
                },
                {   
                    name: 'กำหนดตารางเรียน',
                    type: 'link',
                    icon: 'i-Add',
                    state: 'page/timetable'
                },
            ]
        },
        {
            name: 'ห้องเรียนออนไลน์',
            type: 'dropDown',
            icon: 'i-Monitor-5',
            sub: [
                {   
                    name: 'กำหนดห้องเรียน',
                    type: 'link',
                    icon: 'i-Monitor-5',
                    state: 'page/online-classroom'
                },
            ]
        },
        
        
    ];
    
    StudentMenu: IMenuItem[] = [
        {
            name: 'Demo',
            type: 'dropDown',
            icon: 'i-Code-Window',
            sub: [
                {   
                    name: 'Dashboard',
                    type: 'dropDown',
                    icon: 'i-Bar-Chart',
                    sub: [
                        { icon: 'i-Clock-3', name: 'Version 1', state: '/demo/dashboard/v1', type: 'link' },
                        { icon: 'i-Clock-4', name: 'Version 2', state: '/demo/dashboard/v2', type: 'link' },
                        { icon: 'i-Over-Time', name: 'Version 3', state: '/demo/dashboard/v3', type: 'link' },
                        { icon: 'i-Clock', name: 'Version 4', state: '/demo/dashboard/v4', type: 'link' },
                    ]
                },
                {
                    name: 'UI kits',
                    type: 'dropDown',
                    icon: 'i-Library',
                    sub: [
                        { icon: 'i-Bell', name: 'Alerts', state: '/demo/uikits/alerts', type: 'link' },
                        { icon: 'i-Split-Horizontal-2-Window', name: 'Accordions', state: '/demo/uikits/accordions', type: 'link' },
                        { icon: 'i-Medal-2', name: 'Badges', state: '/demo/uikits/badges', type: 'link' },
                        {
                            icon: 'i-Arrow-Right-in-Circle',
                            name: 'Buttons',
                            type: 'dropDown',
                            sub: [
                                { name: 'Bootstrap Buttons', state: '/demo/uikits/buttons', type: 'link' },
                                { name: 'Loding Buttons', state: '/demo/uikits/buttons-loading', type: 'link' }
                            ]
                        },
                        { icon: 'i-ID-Card', name: 'Cards', state: '/demo/uikits/cards', type: 'link' },
                        { icon: 'i-Line-Chart-2', name: 'Cards metrics', state: '/demo/uikits/cards-metrics', type: 'link' },
                        { icon: 'i-Credit-Card', name: 'Cards widget', state: '/demo/uikits/cards-widget', type: 'link' },
                        { icon: 'i-Full-Cart', name: 'Cards ecommerce', state: '/demo/uikits/cards-ecommerce', type: 'link' },
                        { icon: 'i-Duplicate-Window', name: 'Modals', state: '/demo/uikits/modals', type: 'link' },
                        { icon: 'i-Speach-Bubble-3', name: 'Popover', state: '/demo/uikits/popover', type: 'link' },
                        { icon: 'i-Like', name: 'Rating', state: '/demo/uikits/rating', type: 'link' },
                        { icon: 'i-Loading-3', name: 'Loaders', state: '/demo/uikits/loaders', type: 'link' },
                    ]
                },
                {
                    name: 'Apps',
                    type: 'dropDown',
                    icon: 'i-Computer-Secure',
                    sub: [
                        { icon: 'i-Add-File', name: 'Invoice Builder', state: '/demo/invoice', type: 'link' },
                        { icon: 'i-Email', name: 'Inbox', state: '/demo/inbox', type: 'link' },
                        { icon: 'i-Speach-Bubble-3', name: 'Chat', state: '/demo/chat', type: 'link' },
                        { icon: 'i-Calendar', name: 'Calendar', state: '/demo/calendar', type: 'link' },
                    ]
                },
                {
                    name: 'Forms',
                    type: 'dropDown',
                    icon: 'i-File-Clipboard-File--Text',
                    sub: [
                        { icon: 'i-File-Clipboard-Text--Image', name: 'Basic components', state: '/demo/forms/basic', type: 'link' },
                        { icon: 'i-Split-Vertical', name: 'Form layouts', state: '/demo/forms/layouts', type: 'link' },
                        { icon: 'i-Receipt-4', name: 'Input Group', state: '/demo/forms/input-group', type: 'link' },
                        { icon: 'i-File-Edit', name: 'Input Mask', state: '/demo/forms/input-mask', type: 'link' },
                        { icon: 'i-Tag-2', name: 'Tag Input', state: '/demo/forms/tag-input', type: 'link' },
                        { icon: 'i-Width-Window', name: 'Wizard', state: '/demo/forms/wizard', type: 'link' },
                        { icon: 'i-Crop-2', name: 'Image Cropper', state: '/demo/forms/img-cropper', type: 'link' },
                    ]
                },
                {
                    name: 'Data Tables',
                    type: 'dropDown',
                    icon: 'i-File-Horizontal-Text',
                    sub: [
                        { icon: 'i-File-Horizontal-Text', name: 'List', state: '/demo/tables/list', type: 'link' },
                        { icon: 'i-Full-View-Window', name: 'Fullscreen', state: '/demo/tables/full', type: 'link' },
                        { icon: 'i-Code-Window', name: 'Paging', state: '/demo/tables/paging', type: 'link' },
                        { icon: 'i-Filter-2', name: 'Filter', state: '/demo/tables/filter', type: 'link' },
                    ]
                },
                {
                    name: 'Pages',
                    type: 'dropDown',
                    icon: 'i-Windows-2',
                    sub: [
                        { icon: 'i-Male', name: 'User Profile', state: '/demo/pages/profile', type: 'link' }
                    ]
                },
                {
                    name: 'Icons',
                    type: 'link',
                    icon: 'i-Cloud-Sun',
                    state: '/demo/icons/iconsmind'
                },
                {
                    name: 'Others',
                    type: 'dropDown',
                    icon: 'i-Double-Tap',
                    sub: [
                        { icon: 'i-Error-404-Window', name: 'Not found', state: '/others/404', type: 'link' }
                    ]
                },
                {
                    name: 'Doc',
                    type: 'extLink',
                    icon: 'i-Safe-Box1',
                    state: 'http://demos.ui-lib.com/gull-doc'
                },
                {
                    name: 'Custom Demo',
                    type: 'dropDown',
                    icon: 'i-Code-Window',
                    sub: [
                        { icon: 'i-Code-Window', name: 'Tool Bar', state: '/page/custom-demo/toolbar', type: 'link' }
                    ]
                }
            ]
        },
        // {
        //     name: 'หน้าหลัก',
        //     type: 'link',
        //     icon: 'i-University',
        //     state : '/page/student-home'
        // },
        {
            name: 'ห้องเรียน',
            type: 'dropDown',
            icon: 'i-University1',
            sub: [
                {   
                    name: 'ห้องเรียน',
                    type: 'dropDown',
                    icon: 'i-University',
                    sub: [
                        { icon: 'i-Calendar', name: 'ตารางเรียน', state: '/page/tt-detail', type: 'link' },
                        { icon: 'i-Door', name: 'ห้องเรียนออนไลน์', state: '/page/room', type: 'link' },
                        { icon: 'i-File-Word', name: 'เอกสารเรียน', state: '/page/document', type: 'link' },
                        { icon: 'i-File-Edit', name: 'การบ้าน', state: '/page/homework', type: 'link' },
                    ]
                },
            ]
        },
        
        
    ];

    TeacherMenu: IMenuItem[] = [
        {
            name: 'Demo',
            type: 'dropDown',
            icon: 'i-Code-Window',
            sub: [
                {   
                    name: 'Dashboard',
                    type: 'dropDown',
                    icon: 'i-Bar-Chart',
                    sub: [
                        { icon: 'i-Clock-3', name: 'Version 1', state: '/demo/dashboard/v1', type: 'link' },
                        { icon: 'i-Clock-4', name: 'Version 2', state: '/demo/dashboard/v2', type: 'link' },
                        { icon: 'i-Over-Time', name: 'Version 3', state: '/demo/dashboard/v3', type: 'link' },
                        { icon: 'i-Clock', name: 'Version 4', state: '/demo/dashboard/v4', type: 'link' },
                    ]
                },
                {
                    name: 'UI kits',
                    type: 'dropDown',
                    icon: 'i-Library',
                    sub: [
                        { icon: 'i-Bell', name: 'Alerts', state: '/demo/uikits/alerts', type: 'link' },
                        { icon: 'i-Split-Horizontal-2-Window', name: 'Accordions', state: '/demo/uikits/accordions', type: 'link' },
                        { icon: 'i-Medal-2', name: 'Badges', state: '/demo/uikits/badges', type: 'link' },
                        {
                            icon: 'i-Arrow-Right-in-Circle',
                            name: 'Buttons',
                            type: 'dropDown',
                            sub: [
                                { name: 'Bootstrap Buttons', state: '/demo/uikits/buttons', type: 'link' },
                                { name: 'Loding Buttons', state: '/demo/uikits/buttons-loading', type: 'link' }
                            ]
                        },
                        { icon: 'i-ID-Card', name: 'Cards', state: '/demo/uikits/cards', type: 'link' },
                        { icon: 'i-Line-Chart-2', name: 'Cards metrics', state: '/demo/uikits/cards-metrics', type: 'link' },
                        { icon: 'i-Credit-Card', name: 'Cards widget', state: '/demo/uikits/cards-widget', type: 'link' },
                        { icon: 'i-Full-Cart', name: 'Cards ecommerce', state: '/demo/uikits/cards-ecommerce', type: 'link' },
                        { icon: 'i-Duplicate-Window', name: 'Modals', state: '/demo/uikits/modals', type: 'link' },
                        { icon: 'i-Speach-Bubble-3', name: 'Popover', state: '/demo/uikits/popover', type: 'link' },
                        { icon: 'i-Like', name: 'Rating', state: '/demo/uikits/rating', type: 'link' },
                        { icon: 'i-Loading-3', name: 'Loaders', state: '/demo/uikits/loaders', type: 'link' },
                    ]
                },
                {
                    name: 'Apps',
                    type: 'dropDown',
                    icon: 'i-Computer-Secure',
                    sub: [
                        { icon: 'i-Add-File', name: 'Invoice Builder', state: '/demo/invoice', type: 'link' },
                        { icon: 'i-Email', name: 'Inbox', state: '/demo/inbox', type: 'link' },
                        { icon: 'i-Speach-Bubble-3', name: 'Chat', state: '/demo/chat', type: 'link' },
                        { icon: 'i-Calendar', name: 'Calendar', state: '/demo/calendar', type: 'link' },
                    ]
                },
                {
                    name: 'Forms',
                    type: 'dropDown',
                    icon: 'i-File-Clipboard-File--Text',
                    sub: [
                        { icon: 'i-File-Clipboard-Text--Image', name: 'Basic components', state: '/demo/forms/basic', type: 'link' },
                        { icon: 'i-Split-Vertical', name: 'Form layouts', state: '/demo/forms/layouts', type: 'link' },
                        { icon: 'i-Receipt-4', name: 'Input Group', state: '/demo/forms/input-group', type: 'link' },
                        { icon: 'i-File-Edit', name: 'Input Mask', state: '/demo/forms/input-mask', type: 'link' },
                        { icon: 'i-Tag-2', name: 'Tag Input', state: '/demo/forms/tag-input', type: 'link' },
                        { icon: 'i-Width-Window', name: 'Wizard', state: '/demo/forms/wizard', type: 'link' },
                        { icon: 'i-Crop-2', name: 'Image Cropper', state: '/demo/forms/img-cropper', type: 'link' },
                    ]
                },
                {
                    name: 'Data Tables',
                    type: 'dropDown',
                    icon: 'i-File-Horizontal-Text',
                    sub: [
                        { icon: 'i-File-Horizontal-Text', name: 'List', state: '/demo/tables/list', type: 'link' },
                        { icon: 'i-Full-View-Window', name: 'Fullscreen', state: '/demo/tables/full', type: 'link' },
                        { icon: 'i-Code-Window', name: 'Paging', state: '/demo/tables/paging', type: 'link' },
                        { icon: 'i-Filter-2', name: 'Filter', state: '/demo/tables/filter', type: 'link' },
                    ]
                },
                {
                    name: 'Pages',
                    type: 'dropDown',
                    icon: 'i-Windows-2',
                    sub: [
                        { icon: 'i-Male', name: 'User Profile', state: '/demo/pages/profile', type: 'link' }
                    ]
                },
                {
                    name: 'Icons',
                    type: 'link',
                    icon: 'i-Cloud-Sun',
                    state: '/demo/icons/iconsmind'
                },
                {
                    name: 'Others',
                    type: 'dropDown',
                    icon: 'i-Double-Tap',
                    sub: [
                        { icon: 'i-Error-404-Window', name: 'Not found', state: '/others/404', type: 'link' }
                    ]
                },
                {
                    name: 'Doc',
                    type: 'extLink',
                    icon: 'i-Safe-Box1',
                    state: 'http://demos.ui-lib.com/gull-doc'
                },
                {
                    name: 'Custom Demo',
                    type: 'dropDown',
                    icon: 'i-Code-Window',
                    sub: [
                        { icon: 'i-Code-Window', name: 'Tool Bar', state: '/page/custom-demo/toolbar', type: 'link' }
                    ]
                }
            ]
        },
        {
            name: 'ห้องสอน',
            type: 'dropDown',
            icon: 'i-University1',
            sub: [
                {   
                    name: 'ห้องสอน',
                    type: 'dropDown',
                    icon: 'i-University1',
                    sub: [
                        { icon: 'i-Calendar', name: 'ตารางสอน', state: '/page/teacher-home', type: 'link' },
                        { icon: 'i-File-Edit', name: 'การบ้าน', state: '/page/homeworks', type: 'link' },
                        { icon: 'i-Letter-Open', name: 'เอกสารการเรียน', state: '/page/documentTeacher', type: 'link' },
                    ]
                },
                
            ] 
        },
        
        
        
    ];

    // sets iconMenu as default;
    
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    menuItems2 = new BehaviorSubject<IMenuItem[]>(this.TeacherMenu);
    menuItems3 = new BehaviorSubject<IMenuItem[]>(this.StudentMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();
    menuItems2$ = this.menuItems2.asObservable();
    menuItems3$ = this.menuItems3.asObservable();

    // You can customize this method to supply different menu for
    // different user type.
    publishNavigationChange() {
    this.as.user.role 
      switch (this.as.user.role) {
        case "A":
          this.router.navigateByUrl('/page/emp')
          break;
        case "T":
            this.router.navigateByUrl('/page/teacher-home')
            break;
        case "S":
          this.router.navigateByUrl('/page/tt-detail')
      }
    }
    
}
