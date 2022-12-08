import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  public menu: any[] = [
    {
      'id': 'admin_dashboard',
      'label': 'Dashboard',
      'routerLink': ['/']
    },
  ]

  public ngOnInit() { }

  public getFullname() {
    console.log('activeUser' + AuthService.activeUser);
    return AuthService.activeUser.fullname;
  }
}
