import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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

}
