import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) { }

  @Output() onSearch = new EventEmitter<string>();
  public name: string = '';
  public top: string = '';
  public left: string = '';

  openDropDown(e: any) {
    var target = e.target || e.srcElement || e.currentTarget;
    console.log(target.getBoundingClientRect());
    this.left = target.getBoundingClientRect()['x'] - 1796 + 'px';
    this.top = target.getBoundingClientRect()['y'] + 1676 + 'px';
  }
  closeDropDown() {
    this.left = '';
    this.top = '';
  }

  public getFullname() {
    console.log('activeUser' + AuthService.activeUser);
    return AuthService.activeUser.fullname;
  }

  logout() {
    document.cookie = 'token=;path=/tms;Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    AuthService.activeUser = {};
    return this.router.navigateByUrl('/login');
  }
}
