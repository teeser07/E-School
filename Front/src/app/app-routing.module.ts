import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/theme/components/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './shared/theme/components/layouts/blank-layout/blank-layout.component';
import { AdminLayoutSidebarLargeComponent } from './shared/theme/components/layouts/admin-layout-sidebar-large/admin-layout-sidebar-large.component';
import { AuthGaurd } from './core/auth/auth.gaurd';

const routes: Routes = [
  { path: '', redirectTo: 'page/lobby', pathMatch: 'full' },
  {
    //#region demo
    path: 'demo',
    children: [
      {
        path: '',
        component: AdminLayoutSidebarLargeComponent,
        canActivate: [AuthGaurd],
        canActivateChild: [AuthGaurd],
        children: [
          { path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'uikits', loadChildren: () => import('./views/ui-kits/ui-kits.module').then(m => m.UiKitsModule) },
          { path: 'forms', loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule) },
          { path: 'invoice', loadChildren: () => import('./views/invoice/invoice.module').then(m => m.InvoiceModule) },
          { path: 'inbox', loadChildren: () => import('./views/inbox/inbox.module').then(m => m.InboxModule) },
          { path: 'calendar', loadChildren: () => import('./views/calendar/calendar.module').then(m => m.CalendarAppModule) },
          { path: 'chat', loadChildren: () => import('./views/chat/chat.module').then(m => m.ChatModule) },
          { path: 'contacts', loadChildren: () => import('./views/contacts/contacts.module').then(m => m.ContactsModule) },
          { path: 'tables', loadChildren: () => import('./views/data-tables/data-tables.module').then(m => m.DataTablesModule) },
          { path: 'pages', loadChildren: () => import('./views/pages/pages.module').then(m => m.PagesModule) },
          { path: 'icons', loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule) }
        ]
      }
    ]
    //#endregion
  },
  {
    //#region page
    path: '',
    component: AdminLayoutSidebarLargeComponent,
    canActivate: [AuthGaurd],
    canActivateChild: [AuthGaurd],
    children: [
      { path: 'page', loadChildren: () => import('./page/page.module').then(m => m.PageModule) },
    ]
    //#endregion
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) }
    ]
  },
  {
    //#region others
    path: '',
    component: BlankLayoutComponent,
    canActivate: [AuthGaurd],
    canActivateChild: [AuthGaurd],
    children: [
      { path: 'others', loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule) }
    ]
    //#endregion
  },
  { path: '**', redirectTo: 'others/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
