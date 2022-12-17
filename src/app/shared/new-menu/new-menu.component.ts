import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.scss']
})
export class NewMenuComponent {

  constructor(private authService: AuthService) {}

  @Input() public selectedMenu = 'dashboard';

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
