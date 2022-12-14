import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.scss']
})
export class NewMenuComponent {
  @Input() public selectedMenu = 'dashboard';
}
