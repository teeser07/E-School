import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
) { }

  ngOnInit(): void {
    if (!this.auth.authenticated) this.router.navigateByUrl('/account/signin');
  }
  
}
