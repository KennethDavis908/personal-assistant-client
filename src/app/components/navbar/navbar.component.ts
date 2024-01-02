import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  authenticated: boolean

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(
      authenticated => {this.authenticated = authenticated}
    )
  }

  login = ():void => {
    this.router.navigate(['/daily'])
  }

  logout = (): void => {
    this.authService.logout().subscribe()
    this.router.navigate(['/login'])
  }
}
